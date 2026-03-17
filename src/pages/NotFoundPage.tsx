import GoBackLink from '../components/ui/GoBackLink';

const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="space-y-4">
        <h1 className="text-9xl font-extrabold text-blue-600 dark:text-blue-500 animate-bounce">
          404
        </h1>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
          Página no encontrada
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div className="pt-6">
          <GoBackLink>Volver al Inicio</GoBackLink>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-100 dark:bg-zinc-800/20 rounded-full blur-3xl opacity-50" />
      </div>
    </div>
  );
};

export default NotFoundPage;
