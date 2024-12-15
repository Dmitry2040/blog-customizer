import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useRef, useState, useEffect } from 'react';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';
import Spacing from 'src/ui/spacer/spacer';

interface ArticleParamsFormProps {
	onChange?: (data: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ onChange }: ArticleParamsFormProps) => {
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
	const [selectedFont, setSelectedFont] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const rootRef = useRef<HTMLDivElement>(null);
	const lastStyles = useRef(defaultArticleState);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		lastStyles.current = {
			fontFamilyOption: selectedFont,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			contentWidth: selectedContentWidth,
			fontSizeOption: selectedFontSize,
		};
		if (onChange) {
			onChange(lastStyles.current);
		}
	};

	const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);

		if (onChange) {
			onChange(defaultArticleState);
		}
	};

	useOutsideClickClose({
		isOpen: sidebarIsOpen,
		rootRef: rootRef,
		onClose: () => {
			setSelectedFont(lastStyles.current.fontFamilyOption);
			setSelectedFontSize(lastStyles.current.fontSizeOption);
			setSelectedFontColor(lastStyles.current.fontColor);
			setSelectedBackgroundColor(lastStyles.current.backgroundColor);
			setSelectedContentWidth(lastStyles.current.contentWidth);
		},
		onChange: setSidebarIsOpen,
	});

	const toggleSidebarOpen = () => {
		setSidebarIsOpen(!sidebarIsOpen);
	};

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				toggleSidebarOpen();
			}
		};

		if (sidebarIsOpen) {
			document.addEventListener('keydown', handleEscape);
		} else {
			document.removeEventListener('keydown', handleEscape);
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [sidebarIsOpen, toggleSidebarOpen]);

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={false} onClick={toggleSidebarOpen} />
			<aside
				className={`${styles.container} ${
					sidebarIsOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						selected={selectedFont}
						onChange={setSelectedFont}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<Spacing size='large' />
					<RadioGroup
						selected={selectedFontSize}
						name='radio'
						onChange={setSelectedFontSize}
						options={fontSizeOptions}
						title='размер шрифта'
					/>
					<Spacing size='large' />
					<Select
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
						options={fontColors}
						title='цвет шрифта'
					/>
					<Spacing size='large' />
					<Separator />
					<Spacing size='large' />
					<Select
						selected={selectedBackgroundColor}
						onChange={setSelectedBackgroundColor}
						options={backgroundColors}
						title='цвет фона'
					/>
					<Spacing size='large' />
					<Select
						selected={selectedContentWidth}
						onChange={setSelectedContentWidth}
						options={contentWidthArr}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
