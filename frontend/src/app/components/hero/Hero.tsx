import Button from "../button/button";

const Hero = () => {
  return (
    <section className="w-full h-[75vh] bg-[url(/hero/hero.webp)] bg-no-repeat bg-cover bg-center md:bg-left grid grid-cols-1 md:grid-cols-2 items-center justify-center relative">
      <div className="span-col-1 items-center justify-center w-4/5 md:w-full max-w-[90rem] mx-auto px-4 relative z-10 bg-secondary/25 backdrop-blur-sm py-6 ">
        <h1 className="text-3xl text-center pb-2 text-shadow-lg">
          Relevez le défi !
        </h1>
        <p className="flex wrap">Rejoignez la communauté des gamers</p>
        <p>et prouvez vos compétences</p>
        <Button
          label="Créer un défi"
          variant="cta"
          className="rounded-2xl px-11 my-4"
        />
      </div>
    </section>
  );
};

export default Hero;
