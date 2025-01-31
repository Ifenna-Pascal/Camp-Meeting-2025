import Image from 'next/image';
import { HtmlHTMLAttributes, ReactNode, useEffect } from 'react';

interface IModalProps extends HtmlHTMLAttributes<HTMLDivElement> {
  title?: string;
  closeModal: () => void;
  openState: boolean;
  children: ReactNode;
}

export default function AppModal({
  title,
  openState,
  closeModal,
  children,
}: IModalProps) {

  useEffect(() => {
    if (openState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openState]);

  return openState ? (
    <div className="fixed left-0 top-0 z-40 grid size-full place-items-center bg-black/40 px-4 py-6">
      <label className="absolute top-0 -z-10 size-full" onClick={closeModal}></label>
      <div
        className={'pointer-events-none grid size-full max-w-[600px] content-center overflow-hidden'}
      >
        <div className="pointer-events-auto grid h-auto w-full content-start gap-2 overflow-hidden rounded-xl bg-white">
          {title && (
            <div className="flex items-center justify-between gap-8 bg-[#F8F9FA] p-4 md:px-6">
              <h1 className="font-poppins font-medium text-grey-900">{title}</h1>
              <span className="cursor-pointer p-2" onClick={closeModal}>
                <Image width={10} height={10} src={'/img/close-icon.svg'} alt="close" />
              </span>
            </div>
          )}
          <div className="scroll grid h-full divide-y overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
