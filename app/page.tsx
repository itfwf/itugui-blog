
import { HomePageComponent } from '@/components/home-page';

export default async function Home() {

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start px-4 pt-16 md:flex-row">
      <HomePageComponent />
    </main>
  );
}
