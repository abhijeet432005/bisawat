import React from "react";

const Hero = () => {
  return (
    <section className="min-h-screen font-sans overflow-hidden w-full flex flex-col justify-center items-center">
      <div className="w-[90%] md:w-[80%]">
        {/* Top content */}
        <div className="mb-10 max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-medium text-[#1a1a2e] leading-tight mb-8">
            Авторский аудиотренинг
            <br />
            «Генератор сил» от Сергея Ковтун
          </h1>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <button className="bg-[#c5c0e8] text-[#3c3489] rounded-full px-6 py-3 text-sm font-medium whitespace-nowrap hover:bg-[#b5aee0] transition-colors">
              Получить доступ
            </button>
            <p className="text-xs text-[#5a5a7a] leading-relaxed max-w-sm">
              Практика «Генератор сил» создаёт яркие образы, возбуждает всплеск
              позитивных и добрых эмоций. Это круче, чем посмотреть фильм с
              эффектом полного погружения.
            </p>
          </div>
        </div>

        {/* Photo grid */}
        <div className="grid-wrapper mt-20">
          <div className="card-1 card">
            <img
              src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVudGlzdHxlbnwwfHwwfHx8MA%3D%3D"
              alt="image"
              srcset=""
            />
          </div>
          <div className="card-2 card">
            <img
              src="https://plus.unsplash.com/premium_photo-1682097288491-7e926a30cd0b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZGVudGlzdHxlbnwwfHwwfHx8MA%3D%3D"
              alt="image"
              srcset=""
            />
          </div>
          <div className="card-3 card">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRlbnRpc3R8ZW58MHx8MHx8fDA%3D"
              alt="image"
              srcset=""
            />
          </div>
          <div className="card-4 card">
            <img
              src="https://images.unsplash.com/photo-1564420228450-d9a5bc8d6565?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRlbnRpc3R8ZW58MHx8MHx8fDA%3D"
              alt="image"
              srcset=""
            />
          </div>
          <div className="card-5 card">
            <img
              src="https://images.unsplash.com/photo-1698749778813-ad5f2814e50f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRlbnRpc3R8ZW58MHx8MHx8fDA%3D"
              alt="image"
              srcset=""
            />
          </div>
          <div className="card-6 card">
            <img
              src="https://plus.unsplash.com/premium_photo-1674998806375-58edc35ddf3b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRlbnRpc3R8ZW58MHx8MHx8fDA%3D"
              alt="image"
              srcset=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
