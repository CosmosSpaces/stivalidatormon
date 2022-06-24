import React from 'react';

import FocusLock from 'react-focus-lock';
import { ReactFocusLockProps } from 'react-focus-lock/interfaces';

import { useEscapeHatch } from '../lib/util';

type ModalProps = { focusLockProps?: FocusLockProps } & DefaultDivProps;
type FocusLockProps = ReactFocusLockProps<React.ReactNode, Record<string, any>>;
type DefaultDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
type DefaultButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const defaultFocusProps: FocusLockProps = {
  returnFocus: true,
};

export const Modal = ({
  children,
  focusLockProps = defaultFocusProps,
  ...props
}: ModalProps) => {
  return (
    <FocusLock {...focusLockProps}>
      <div className="modal" role="dialog" aria-modal="true" {...props}>
        {children}
      </div>
    </FocusLock>
  );
};

type CloseIconProps = {
  onClose: () => void;
  svgClassName?: string;
  svgViewBox?: string;
} & DefaultButtonProps;

const CloseIcon = ({
  onClose,
  svgClassName = 'fill-current text-white w-6 h-6',
  svgViewBox = '0 0 18 18',
  ...props
}: CloseIconProps) => {
  return (
    <button
      type="button"
      className="ml-auto z-50 p-3"
      onClick={onClose}
      aria-label="Close"
      {...props}
    >
      <svg
        className={svgClassName}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={svgViewBox}
      >
        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
      </svg>
    </button>
  );
};
Modal.CloseIcon = CloseIcon;

type ModalMaskProps = {
  onClose: () => void;
} & DefaultDivProps;

const ModalMask = ({ onClose, className = '', ...props }: ModalMaskProps) => {
  useEscapeHatch(onClose);
  return (
    <div onClick={onClose} className={`modal__mask ${className}`} {...props} />
  );
};
Modal.Mask = ModalMask;

const ModalWindow = ({ className, children, ...props }: DefaultDivProps) => {
  return (
    <div className={`modal__window ${className}`} {...props}>
      {children}
    </div>
  );
};
Modal.Window = ModalWindow;

const ModalHeader = ({
  titleId,
  ...props
}: DefaultDivProps & { title: string; titleId: string }) => {
  return (
    <header {...props} className="modal__header bg-purple-500">
      <div className="text-center w-full flex items-center justify-center z-40">
        <h1
          className="w-32 lg:w-full text-white text-lg lg:text-2xl font-medium tracking-tight"
          id={titleId}
        >
          {props.title}
        </h1>
      </div>
    </header>
  );
};
Modal.Header = ModalHeader;
