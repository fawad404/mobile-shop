import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Input } from '../../src/Components/ui/input'
const Login = () => {
  const [show, setShow] = useState(true); // Ensure the popup is always shown
  const modalRef = useRef(null);

  return (
    <section
      className={`fixed top-0 right-0 w-full h-full bg-[#00000085] z-10 place-items-center flex justify-center transition-all duration-500 ${
        show ? "flex" : "hidden"
      }`}
    >
      <div className="contain flex justify-center items-center">
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: "-150px" }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1 }}
          className="w-[406px] min-h-[450px] border border-[#F1F2F4] rounded-lg bg-white p-4 md:p-8 overflow-y-auto text-darkColor flex flex-col items-center relative"
        >
          <h2 className="w-full text-center text-2xl font-bold">
            Sign In to Fiverr
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 w-full mt-10"
          >
            <Input
              showLabel={false}
              htmlFor="username"
              label="Username"
              labelClassName="text-sm font-medium text-darkColor"
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getError("username")}
              id="username"
              placeholder="Johndoe"
              className="bg-white  border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
            />
            <Input
              showLabel={false}
              htmlFor="password"
              label="Password"
              labelClassName="text-sm font-medium text-darkColor"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getError("password")}
              id="password"
              placeholder="********"
              className="bg-white  border border-[#C7CBD1] w-full h-[40px] rounded px-4 focus:border-[1.5px] focus:border-primary outline-none text-sm"
            />
            <button
              type="submit"
              className="mt-5 bg-primary/80 hover:bg-primary w-full rounded-md text-white py-2 text-base font-semibold"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <img src={loader} alt="/" className="w-[40px]" />
                </div>
              ) : (
                <p className="flex items-center justify-center gap-2">Login</p>
              )}
            </button>
          </form>
          <div
            onClick={() => setShow(false)}
            className="w-full border-t absolute bottom-0 py-4 bg-white z-10 px-8 flex items-center justify-center text-sm font-semibold text-darkColor gap-2"
          >
            Not a member yet?
            <Link to="/join" className="text-primary">
              Join now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Login
