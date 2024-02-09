import ChatBot from '@/components/ChatBot';
import Navbar1 from '@/components/Navbar1';
import React from 'react'

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Navbar1/>
    {children}
    <ChatBot/>
    </>
  )
}

export default layout