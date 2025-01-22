"use client";

import MainMenu from "./../components/MainMenu";
import SlideComponent from "./../components/sliders/sliderComponent";
import Cards from '../components/cards/cardComponent';
import Footer from "../components/Footer";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Description, Dialog, DialogPanel, DialogTitle, DialogBackdrop, } from '@headlessui/react'
import PageTitle from "../components/PageTitle";


export default function Page() {
  return (
    <main className="min-h-screen antialiased">
      <MainMenu />
      <PageTitle title={'Carriere'} />
      <Footer />
    </main>
  );
}
