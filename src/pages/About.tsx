export const About = () => {
  return (
    <section className="md:h-[76vh] m-5 flex flex-col md:flex-row items-center justify-between gap-10">
      <div className="p-10 space-y-8">
        <h1 className="text-[2rem]">About this project:</h1>
        <p className="text-lg">
          Welcome to my coding adventure, where I'm building this blog from the
          ground up. Rest assured, I embrace mistakes as opportunities to learn
          and grow.
        </p>
        <h1 className="text-[2rem]">What's the scoop?</h1>
        <p className="text-lg">
          This project is my personal playground for learning React on the
          frontend and get hand on experience with Laravel as API on the
          backend. I'm on a quest to learn and understand web development, one
          line of code at a time.
        </p>
      </div>

      <img className="p-10" src="/done.gif" alt="picture" />
    </section>
  );
};
