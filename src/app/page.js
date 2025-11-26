import SectionHeader from "../components/layout/SectionHeader";
import HomeMenu from "./../components/layout/HomeMenu";
import Main from "./../components/layout/Main";

export default function Home() {
  return (
    <>
      <Main />
      <HomeMenu />
      <section id="about" className="text-center my-16" >
        <SectionHeader subHeader={'Our story'} mainHeader={'About Us'} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </section>
      <section id="contact" className="text-center my-8" >
        <SectionHeader subHeader={'Don\'t hesitate'} mainHeader={'Contact Us'} />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+905551234567">
            555 123 45 67
          </a>
        </div>
      </section>
      <footer className="border-t p-8 text-center text-grey-500 mt-16">
        &copy; 2023 All rights reserved
      </footer>
    </>
  )
}
