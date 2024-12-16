import { useEffect } from 'react';

type TUseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: TUseOutsideClickClose) => {
	useEffect(() => {
		const handleClickClose = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
				onChange?.(false);
			}
		};

		window.addEventListener('mousedown', handleClickClose);

		return () => {
			window.removeEventListener('mousedown', handleClickClose);
		};
	}, [onClose, onChange, isOpen]);
};
