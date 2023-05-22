import React from "react";

import logo2 from '../../assets/images/logo2.png'
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="container-sk">
      <footer className="bg-primary  shadow  ">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="flex items-center md:flex-row flex-col gap-4 justify-between">
            <div className="md:w-1/2 w-full break-words">
              <img
                placeholder="blur"
                src= {logo2}
                alt="Logo"
                width={400}
                height={400}
                blurDataURL="/blur.png"
                className="object-contain  w-40"
              />
              <p className="mt-5 text-white">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
             
              </p>
            </div>

            <ul className="flex flex-wrap justify-center items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link
                  to="#"
                  className="mr-4 hover:text-red-700 duration-300 md:mr-6"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="mr-4 hover:text-red-700 duration-300 md:mr-6 "
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-red-700 duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 mx-auto dark:border-gray-700 lg:my-8 " />
          <span className="block text-lg text-white text-center  ">
            © 2023 Tracline All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
