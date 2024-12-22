import styled, { css } from "styled-components";
import React from "react";

export const buttonTypes = ["primary", "secondary", "ghost"] as const;
export const sizes = ["small", "medium", "large"] as const;

type ButtonTypes = (typeof buttonTypes)[number]
type Sizes = (typeof sizes[number])

// 根据变体（variant）类型，求解不同组件的 UI 表现
const SCxButton = styled.button<{size: Sizes}>`
	color: var(--color-primary);
	border: none;
	padding: var(--padding) var(--padding);
	border-radius: 8px;
	background-color: var(--color-bg-primary);
	
	${({size}) => {
		return css`
			padding: var(--padding-${size});
			font-size: var(--font-size-${size})
		`
	}}
`

export const Button: React.FC<{ type: ButtonTypes, size: Sizes, children: React.ReactNode }> = ({ children, size }) => {
	return <SCxButton size={size}>{children}</SCxButton>
}
