"use client";

import { useEffect, useState } from "react";
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isFloating, setIsFloating] = useState(false);

  // Fungsi untuk mengecek apakah 2 hari telah berlalu
  const shouldShowPopup = () => {
    const disableTimestamp = localStorage.getItem("disablePopup");
    if (!disableTimestamp) return true;
    const lastDisabled = new Date(disableTimestamp);
    const now = new Date();
    const diffTime = now.getTime() - lastDisabled.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays >= 2;
  };

  useEffect(() => {
    if (shouldShowPopup()) {
      const handleScroll = () => {
        setIsOpen(true);
        window.removeEventListener("scroll", handleScroll);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("disablePopup", new Date().toISOString());
    }
    setIsOpen(false);
    setIsFloating(false);
  };

  const handleMinimize = () => {
    setIsOpen(false);
    setIsFloating(true);
  };

  return (
    <>
      {/* Popup utama */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="tw-max-w-sm tw-rounded-lg tw-p-6 tw-bg-white tw-shadow-lg" disabled={true}>
          <DialogClose asChild>
            <button
              onClick={handleMinimize}
              className="tw-absolute tw-top-2 tw-right-2 tw-text-gray-600 hover:tw-text-gray-900"
            >
              <X size={20} />
            </button>
          </DialogClose>
          <DialogHeader>
            <DialogTitle>Selamat Datang!</DialogTitle>
          </DialogHeader>
          <p className="tw-text-gray-600">Ini adalah popup yang muncul saat Anda pertama kali mengunjungi situs ini.</p>
          <div className="tw-flex tw-items-center tw-space-x-2 tw-mt-4">
            <Checkbox
              id="dont-show-again"
              checked={dontShowAgain}
              onCheckedChange={(checked) => setDontShowAgain(checked)}
            />
            <label htmlFor="dont-show-again" className="tw-text-sm tw-text-gray-700">
              Jangan tampilkan lagi selama 2 hari
            </label>
          </div>
          <button
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            onClick={handleClose}
          >
            Tutup
          </button>
        </DialogContent>
      </Dialog>

      {/* Floating Popup di kiri bawah */}
      {isFloating && (
        <div className="fixed bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg flex items-center space-x-2">
          <p className="text-sm font-medium text-gray-700">Popup tersedia</p>
          <button
            className="bg-blue-600 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-700"
            onClick={() => setIsOpen(true)}
          >
            Buka
          </button>
        </div>
      )}
    </>
  );
};

export default PromoPopup;