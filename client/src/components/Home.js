import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { appName, getToken } from '../config';

const Navbar = ({ lang }) => (
  <>
    <div className='flex justify-between items-center px-3 py-2 border-b border-gray-200'>
      <p className='font-semibold text-lg text-primary-500 font-logo'>{appName}</p>
      <div>
        {getToken() ? (
          <Button color='inherit' href='/app' key='App'>
            Home
          </Button>
        ) : (
          <>
            <Button color='inherit' href='/login' key='Login'>
              Login
            </Button>
            <Button color='inherit' href='/signup' key='Register'>
              Get Start
            </Button>
          </>
        )}
      </div>
    </div>
    <div className='relative bg-white overflow-hidden'>
      <div className='max-w-screen-xl mx-auto '>
        <div className='relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32'>
          <svg
            className='hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2'
            fill='currentColor'
            viewBox='0 0 100 100'
            preserveAspectRatio='none'>
            <polygon points='50,0 100,0 50,100 0,100' />
          </svg>

          <div className='relative pt-2 px-4 sm:px-6 lg:px-8'></div>
          <div className='mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
            <div className='sm:text-center lg:text-left'>
              <h2 className='text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl'>
                Store your
                <br className='xl:hidden' />
                <span className='text-indigo-600'> sensitive data</span>
              </h2>
              <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                Master is a software which store your passwords,credit cards and sensitive data.
                Master remembers all your passwords across every device for free!
              </p>
              <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                <div className='rounded-md shadow'>
                  <a
                    href='signup'
                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10'>
                    Get started
                  </a>
                </div>
                <div className='mt-3 sm:mt-0 sm:ml-3'>
                  <a
                    href='login'
                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10'>
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2'>
        <img
          className='h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full'
          src='https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80'
          alt=''
        />
      </div>
    </div>
    <div className='py-12 bg-white'>
      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='lg:text-center'>
          <p className='text-base leading-6 text-indigo-600 font-semibold tracking-wide uppercase'>
            not just passwords
          </p>
          <h3 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10'>
            Also store your important notes
          </h3>
          <p className='mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto'>
            Not only passwords Master allow you to store your important notes,personal informations
            ,credit card & bank details and let you easily share with your colleagues
          </p>
        </div>

        <div className='mt-10'>
          <ul className='md:grid md:grid-cols-2 md:col-gap-8 md:row-gap-10'>
            <li>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <div className='flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                    <svg className='h-6 w-6' stroke='currentColor' fill='none' viewBox='0 0 24 24'>
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
                      />
                    </svg>
                  </div>
                </div>
                <div className='ml-4'>
                  <h5 className='text-lg leading-6 font-medium text-gray-900'>Log in and go</h5>
                  <p className='mt-2 text-base leading-6 text-gray-500'>
                    Once you save a password in Master, you'll always have it when you need it;
                    logging in is fast and easy.
                  </p>
                </div>
              </div>
            </li>
            <li className='mt-10 md:mt-0'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <div className='flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                    <i className='bx bx-lock-alt text-2xl'></i>
                  </div>
                </div>
                <div className='ml-4'>
                  <h5 className='text-lg leading-6 font-medium text-gray-900'>
                    Generate strong passwords
                  </h5>
                  <p className='mt-2 text-base leading-6 text-gray-500'>
                    The built-in password generator creates long, randomized passwords that protect
                    against hacking
                  </p>
                </div>
              </div>
            </li>
            <li className='mt-10 md:mt-0'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <div className='flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                    <i className='bx bxs-folder-open text-2xl'></i>
                  </div>
                </div>
                <div className='ml-4'>
                  <h5 className='text-lg leading-6 font-medium text-gray-900'>
                    Store digital records
                  </h5>
                  <p className='mt-2 text-base leading-6 text-gray-500'>
                    Credit cards, bank accounts, personal informations... keep all your notes safe
                    and easy to find.
                  </p>
                </div>
              </div>
            </li>
            <li className='mt-10 md:mt-0'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <div className='flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                    <i className='bx bxs-share-alt text-2xl'></i>
                  </div>
                </div>
                <div className='ml-4'>
                  <h5 className='text-lg leading-6 font-medium text-gray-900'>
                    Share effortlessly
                  </h5>
                  <p className='mt-2 text-base leading-6 text-gray-500'>
                    Some things shouldn't be sent in a text. Conveniently and safely share passwords
                    and notes with anyone in realtime.
                  </p>
                </div>
              </div>
            </li>
            <li className='mt-10 md:mt-0'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <div className='flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                    <i className='bx bx-extension text-2xl'></i>
                  </div>
                </div>
                <div className='ml-4'>
                  <h5 className='text-lg leading-6 font-medium text-gray-900'>Browser extension</h5>
                  <p className='mt-2 text-base leading-6 text-gray-500'>
                    Add the master extension .Next time you will be logged automatically
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className='bg-gray-50'>
      <div className='max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between'>
        <h2 className='text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10'>
          Ready to dive in?
          <br />
          <span className='text-indigo-600'>Create your account.</span>
        </h2>
        <div className='mt-8 flex lg:flex-shrink-0 lg:mt-0'>
          <div className='inline-flex rounded-md shadow'>
            <a
              href='signup'
              className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out'>
              Get started
            </a>
          </div>
          <div className='ml-3 inline-flex rounded-md shadow'></div>
        </div>
      </div>
    </div>
  </>
);

const mapStateToProp = ({ app }) => ({ lang: app.lang });
export default connect(mapStateToProp, {})(Navbar);
