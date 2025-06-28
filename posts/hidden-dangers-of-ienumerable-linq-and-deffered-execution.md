---
slug: 'hidden-dangers-of-ienumerable-linq-and-deffered-execution'
title: 'How LINQ deferred execution can double memory allocation and add bugs'
excerpt: "Learn how LINQ's deferred execution can unintentionally double memory allocation and degrade performance. A small oversight led to significant resource consumption."
tags: ['IEnumerable', 'bug', 'refactor', "c#", "Deferred Execution"]
readTime: 5 min
date: '2025-03-01'
image: dotnet-logo.svg
---

> Ever did a refactor and introduced a production bug? IEnumerable<T> did exactly that in my case—causing an unexpected issue that took hours to debug.

LINQ and `IEnumerable<T>` provide a simple and elegant way to work with collections. However, one of the most overlooked aspects of LINQ is **deferred execution**, which can lead to subtle bugs, performance issues, and unexpected memory allocations.

Why I'm bringing this up? Cause the last week I tracked a bug caused by this feature of LINQ. ( that should be caugth by Unit Tests)

## Understanding Deferred Execution in LINQ

Deferred execution means that a LINQ query is not evaluated immediately when it is defined but only when it is **iterated**. This allows for optimizations such as query composition, filtering, and transformation without executing unnecessary computations upfront.

### Deferred vs. Immediate Execution

|  Execution Type | Behaviour  | When to user  |
|-----------------|------------|---------------|
| **Deferred Execution**   | Query runs only when iterated  | When filtering large collections dynamically  |
| **Immediate Execution**  | Query runs immediately and stores results  | When stability of results is required  |

#### Example of Deferred Execution

```csharp
var numbers = new List<int> { 1, 2, 3, 4, 5 };
var query = numbers.Where(n => n > 2); // Query is defined but not executed

// Execution happens here
foreach (var num in query)
{
    Console.WriteLine(num);
}
```

In this example, the `Where` filter is applied only when the `foreach` loop is executed.
Let's enhance this example with some logging and a second `foreach` loop to demonstrate the effect:

```cs
var numbers = new List<int> { 1, 2, 3, 4, 5 };
Console.WriteLine("Filtering items");
var query = numbers.Where(n =>
{
    Console.WriteLine($"Filter executed for number: {n}");
    return n > 2;
}); // Query is defined but not executed

Console.WriteLine("Done with fitlering, starting iterating");

// Execution happens here
foreach (var num in query)
{
    Console.WriteLine($"From foreach {num}");
}
Console.WriteLine("Second foreach");

// Another execution happens here
foreach (var num in query)
{
    Console.WriteLine($"From second foreach: {num}");
}
```

Can you guess the output ?

```log
Filtering items
Done with fitlering, starting iterating

Filter executed for number: 1
Filter executed for number: 2
Filter executed for number: 3
From foreach 3
Filter executed for number: 4
From foreach 4
Filter executed for number: 5
From foreach 5

Second foreach
Filter executed for number: 1
Filter executed for number: 2
Filter executed for number: 3
From second foreach: 3
Filter executed for number: 4
From second foreach: 4
Filter executed for number: 5
From second foreach: 5
```

> ⚠️ A new filtered collection of even numbers is produces for each iteration.

#### Example of Immediate Execution

```cs
var numbers = new List<int> { 1, 2, 3, 4, 5 };
var result = numbers.Where(n => n > 2).ToList(); // Executed immediately
```

Calling `.ToList()` forces execution immediately, storing the results in memory. This ensures that no matter how many times `result` is used in a `foreach` loop, the Where clause runs **only once**.

## The Bug That Slipped Through: How LINQ Deferred Execution Broke Our Orders

We had a simple API endpoint that processed incoming order requests. It mapped an `OrderRequest` to an internal `Order` domain object, enriched it with additional properties, and sent it to another service.

Here’s the problematic code:
![The code that caused the bug](/images/hidden-dangers-of-ienumerable-linq-and-deffered-execution/bug-setup-code.webp)
At first glances everything looked ok, nothing was triggering the alarm, but one critical field, `delivery`, was missing from the outgoing request. After debugging, the issue became clear:

![Output ](/images/hidden-dangers-of-ienumerable-linq-and-deffered-execution/bug-output-response.webp)

### What Went Wrong?

1. The incoming request was mapped to an internal domain object.
2. The mapping logic for `LineItem`s was defined using LINQ but was **not executed immediately**.
3. The first iteration over `Items` triggered execution, setting the delivery field.
4. However, when the object was serialized for the outgoing request, the LINQ expression **executed again**, but this time the `delivery` field was missing.

**Unintended result**: A single `Order` object and two `LineItem` objects were created. While this might seem like a small issue, it actually resulted in doubling the number of LineItem objects during the request. This caused unnecessary memory allocation and increased resource consumption, which went unnoticed until it started affecting performance.

### Conclusion

Hope that this issue highlights the importance of understanding how LINQ queries are executed in C# and the potential pitfalls when their execution timing is not carefully managed. In this case, a small oversight in how LINQ expressions were evaluated led to significant memory inefficiencies. By ensuring that LINQ queries are executed immediately (e.g., using `.ToList()` or `.ToArray()`), we can avoid unexpected behavior and optimize the resource usage of our applications.

Always test for these edge cases to ensure your code handles data efficiently and doesn’t introduce hidden performance bottlenecks.
