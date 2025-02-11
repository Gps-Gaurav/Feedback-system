'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { Menu, X } from 'lucide-react'; 

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' 
        : 'bg-gray-900'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
     
          <Link 
            href="/" 
            className="text-xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            Anonymous Feedback
          </Link>

          <button
            className="md:hidden text-white hover:text-blue-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-white/90">
                  Welcome, <span className="font-semibold">{user.username || user.email}</span>
                </span>
                <Button 
                  onClick={() => signOut()} 
                  className="bg-white hover:bg-blue-50 text-gray-900 hover:text-blue-600 transition-colors"
                  variant='outline'
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/sign-in">
                <Button 
                  className="bg-white hover:bg-blue-50 text-gray-900 hover:text-blue-600 transition-colors"
                  variant='outline'
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-48 opacity-100 pb-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          {session ? (
            <div className="flex flex-col space-y-3">
              <span className="text-white/90 text-center">
                Welcome, <span className="font-semibold">{user.username || user.email}</span>
              </span>
              <Button 
                onClick={() => signOut()} 
                className="w-full bg-white hover:bg-blue-50 text-gray-900 hover:text-blue-600 transition-colors"
                variant='outline'
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/sign-in" className="block">
              <Button 
                className="w-full bg-white hover:bg-blue-50 text-gray-900 hover:text-blue-600 transition-colors"
                variant='outline'
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;