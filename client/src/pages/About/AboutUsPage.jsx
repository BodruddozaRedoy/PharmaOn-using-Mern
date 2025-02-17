import React, { useState } from "react";
import { Helmet } from "react-helmet";


const AboutUsPage = () => {
    const [email, setEmail] = useState("")
    
    
   
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About | PharmaOn</title>
      </Helmet>

        <div className="hero bg-white">
        <div className="hero-content flex-col lg:flex-row-reverse">
        <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/group-discussion-illustration-download-in-svg-png-gif-file-formats--composition-round-speech-pack-people-illustrations-2708924.png"
        className="" />
        <div>
        <h1 className="text-5xl font-bold">About Us</h1>
        <p className="py-6">
        "We're your one-stop shop for the latest gadgets and tech trends. Discover innovative products, expert reviews, and exclusive deals."
        </p>
        <button className="btn bg-primary text-white font-bold">Learn More</button>
        </div>
    </div>
    </div>

    {/* form section  */}

    <div className="hero bg-base-200 py-20">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold text-center">Get in touch with us</h1>
      <p className="py-6 text-center text-gray-400">
      "We're your one-stop shop for the latest gadgets and tech trends. Discover innovative products, expert reviews, and exclusive deals."
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="p-10 flex flex-col gap-5 md:gap-0 md:flex-row" onSubmit={"sendEmail"}>
        <div className="form-control">
          <input  type="email" name="email" placeholder="Type your email here" className="input input-bordered" required onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-control md:ml-6">
          <button className="btn text-white bg-primary w-full">Send</button>
        </div>
      </form>
    </div>
  </div>
</div>
    </div>
  );
};

export default AboutUsPage;
