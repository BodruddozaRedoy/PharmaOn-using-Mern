import React from "react";

const Testimonials = () => {
  return (
    <div>
      <section id="testimonies" class="py-20 ">
        <div class=" mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
          <div class="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
            <div class="mb-12 space-y-5 md:mb-16 md:text-center">
              <div class="inline-block px-3 py-1 text-sm font-semibold text-indigo-100 rounded-lg md:text-center text-cn bg-[#202c47] bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40 ">
                Words from Others
              </div>
              <h1 class="mb-5 text-3xl font-semibold text-black md:text-center md:text-5xl dark:text-white">
                It's not just us.
              </h1>
              <p class="text-xl text-black md:text-center md:text-2xl dark:text-white">
                Here's what others have to say about us.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <ul class="space-y-8">
              <li class="text-sm leading-6">
                <div class="relative group">
                  <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a
                    href="https://twitter.com/kanyewest"
                    class="cursor-pointer"
                  >
                    <div class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div class="flex items-center space-x-4">
                        <img
                          src="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg"
                          class="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Kanye West"
                        />
                        <div>
                          <h3 class="text-lg font-semibold text-white">
                            Kanye West
                          </h3>
                          <p class="text-gray-500 text-md">HealWell Labs</p>
                        </div>
                      </div>
                      <p class="leading-normal text-gray-300 text-md">
                        Great product! Works as described, but the shipping took
                        a bit longer than expected. Overall, very satisfied!
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li class="text-sm leading-6">
                <div class="relative group">
                  <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a href="https://twitter.com/tim_cook" class="cursor-pointer">
                    <div class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div class="flex items-center space-x-4">
                        <img
                          src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                          class="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Tim Cook"
                        />
                        <div>
                          <h3 class="text-lg font-semibold text-white">
                            Tim Cook
                          </h3>
                          <p class="text-gray-500 text-md">MediCure Pharma</p>
                        </div>
                      </div>
                      <p class="leading-normal text-gray-300 text-md">
                        Fantastic experience! Customer service was super
                        helpful, and the product is top-notch. Will definitely
                        buy again
                      </p>
                    </div>
                  </a>
                </div>
              </li>
            </ul>

            <ul class="hidden space-y-8 sm:block">
              <li class="text-sm leading-6">
                <div class="relative group">
                  <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a href="https://twitter.com/paraga" class="cursor-pointer">
                    <div class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div class="flex items-center space-x-4">
                        <img
                          src="https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg"
                          class="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Parag Agrawal"
                        />
                        <div>
                          <h3 class="text-lg font-semibold text-white">
                            Parag Agrawal
                          </h3>
                          <p class="text-gray-500 text-md">BioTrust Pharmaceuticals</p>
                        </div>
                      </div>
                      <p class="leading-normal text-gray-300 text-md">
                        Decent quality, but I had some minor issues setting it
                        up.The attention to detail is outstanding. Worth every
                        penny!
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li class="text-sm leading-6">
                <div class="relative group">
                  <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a href="https://twitter.com/tim_cook" class="cursor-pointer">
                    <div class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div class="flex items-center space-x-4">
                        <img
                          src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                          class="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Tim Cook"
                        />
                        <div>
                          <h3 class="text-lg font-semibold text-white">
                            Tim Cook
                          </h3>
                          <p class="text-gray-500 text-md">VitaMed Solutions</p>
                        </div>
                      </div>
                      <p class="leading-normal text-gray-300 text-md">
                        I’m so impressed! The attention to detail is
                        outstanding. Worth every penny! The build quality could
                        be better, and I ran into a few issues.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
            </ul>

            <ul class="hidden space-y-8 lg:block">
              <li class="text-sm leading-6">
                <div class="relative group">
                  <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a
                    href="https://twitter.com/satyanadella"
                    class="cursor-pointer"
                  >
                    <div class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div class="flex items-center space-x-4">
                        <img
                          src="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg"
                          class="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Satya Nadella"
                        />
                        <div>
                          <h3 class="text-lg font-semibold text-white">
                            Satya Nadella
                          </h3>
                          <p class="text-gray-500 text-md">NutriPharm Healthcare</p>
                        </div>
                      </div>
                      <p class="leading-normal text-gray-300 text-md">
                        Not quite what I expected. The build quality could be
                        better, and I ran into a few issues.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li class="text-sm leading-6">
                <div class="relative group">
                  <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a
                    href="https://twitter.com/dan_schulman"
                    class="cursor-pointer"
                  >
                    <div class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div class="flex items-center space-x-4">
                        <img
                          src="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg"
                          class="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Dan Schulman"
                        />
                        <div>
                          <h3 class="text-lg font-semibold text-white">
                            Dan Schulman
                          </h3>
                          <p class="text-gray-500 text-md">WellnessCure Inc.</p>
                        </div>
                      </div>
                      <p class="leading-normal text-gray-300 text-md">
                        Quam pellentesque nec nam aliquam sem et tortor
                        consequat id. Enim sit amet venenatis urna cursus.
                      </p>
                    </div>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
