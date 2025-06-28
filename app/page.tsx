
import { Metadata } from 'next';
import Posts from '@/components/posts';

export const metadata: Metadata = {

}
export default async function Home() {

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start px-4 pt-16 md:flex-row">
      <div className="min-h-screen">
        <section className='w-full py-12'>
          <h1 className='mb-2 text-3xl font-bold'> Welcome to my corner of the internet!</h1>
        </section>
        <Posts />
      </div>
    </main>
  );
}

