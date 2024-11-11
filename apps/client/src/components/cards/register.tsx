import Form from 'next/form';

export default async function Register() {
    const registerUser = async (formData: FormData) => {
        'use server';
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
    
        const response = await fetch('http://localhost:3002/auth/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });
        console.log(await response.json())
    }
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-[url('/buddy.svg')] bg-cover bg-no-repeat text-[#f9f9f9] relative">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/35"></div>

            {/* Centered Register Card */}
            <div className="relative z-10 w-full max-w-4xl px-8 py-16 text-center rounded-2xl bg-[#180E38]/[0.44] backdrop-blur-md flex flex-col md:flex-row">
                {/* Social Signup Options - Left Side on large screens */}
                <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:border-r md:border-[#ffffff]/[0.38] md:pr-8">
                    <h2 className="text-[40px] font-normal mb-3">Register</h2>
                    <p className="text-[#ffffff]/[0.38] font-normal text-lg mb-8">
                        Create a new account
                    </p>
                    
                    <div className="flex flex-col space-y-4 w-full">
                        <button className="flex items-center justify-center w-full h-14 rounded-md bg-[#DB4437] text-[#f9f9f9] text-lg font-normal transition duration-300 hover:bg-[#b93b30]">
                            <i className="fab fa-google mr-2"></i>
                            Sign up with Google
                        </button>
                        <button className="flex items-center justify-center w-full h-14 rounded-md bg-[#4267B2] text-[#f9f9f9] text-lg font-normal transition duration-300 hover:bg-[#365899]">
                            <i className="fab fa-facebook mr-2"></i>
                            Sign up with Facebook
                        </button>
                        <button className="flex items-center justify-center w-full h-14 rounded-md bg-[#333333] text-[#f9f9f9] text-lg font-normal transition duration-300 hover:bg-[#1a1a1a]">
                            <i className="fab fa-github mr-2"></i>
                            Sign up with GitHub
                        </button>
                    </div>
                </div>

                {/* Registration Form - Right Side on large screens */}
                <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8 flex flex-col">
                    <Form action={registerUser} className="grid w-full gap-6">
                        <div className="flex flex-col items-start">
                            <label htmlFor="username" className="text-[#ffffff]/[0.66] text-sm mb-1">
                                Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="w-full h-14 px-4 rounded-md text-[#ffffff]/[0.96] bg-[#37207A] text-lg placeholder:text-[#ffffff]/[0.38] focus:outline-none focus:ring-2 focus:ring-[#5d0dde]"
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        <div className="flex flex-col items-start">
                            <label htmlFor="email" className="text-[#ffffff]/[0.66] text-sm mb-1">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full h-14 px-4 rounded-md text-[#ffffff]/[0.96] bg-[#37207A] text-lg placeholder:text-[#ffffff]/[0.38] focus:outline-none focus:ring-2 focus:ring-[#5d0dde]"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="flex flex-col items-start">
                            <label htmlFor="password" className="text-[#ffffff]/[0.66] text-sm mb-1">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full h-14 px-4 rounded-md text-[#ffffff]/[0.96] bg-[#37207A] text-lg placeholder:text-[#ffffff]/[0.38] focus:outline-none focus:ring-2 focus:ring-[#5d0dde]"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="h-14 w-full rounded-md bg-[#5d0dde] text-[#f9f9f9] font-normal text-lg transition duration-300 hover:bg-[#450bb3] mt-6"
                        >
                            Register
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
