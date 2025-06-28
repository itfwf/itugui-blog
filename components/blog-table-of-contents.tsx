import { TocItem } from "@/lib/posts"

type Args = {
    items: TocItem[]
}
export function TableOfContents(props: Args) {

    const { items } = props;

    return (
        <nav className="space-y-2">
            <div className="block">
                <h2 className="text-lg font-semibold mb-4 px-4">Table of Contents</h2>
                <TocList items={items} />
            </div>
        </nav>
    )
}

function TocList({ items }: { items: TocItem[] }) {
    return (
        <ul className="space-y-2 px-4">
            {items.map((item) => (
                <li key={item.id} style={{ paddingLeft: `${(item.level - 1) * 0.5}rem` }}>
                    <a
                        href={`#${item.id}`}
                        className="text-muted-foreground hover:text-foreground transition-colors block py-1"
                    >
                        {item.title}
                    </a>
                </li>
            ))}
        </ul>
    )
}
