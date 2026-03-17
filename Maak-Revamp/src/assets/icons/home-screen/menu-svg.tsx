import * as React from "react";
import Svg, { Rect, Path, SvgProps } from "react-native-svg";

const MenuSvg = (props: SvgProps) => (
    <Svg
        width={32}
        height={32}
        viewBox="0 0 32 32"
        fill="none"
        {...props}
    >
        <Rect x={0.5} y={0.5} width={31} height={31} rx={15.5} fill="#DD4747" />
        <Rect x={0.5} y={0.5} width={31} height={31} rx={15.5} stroke="#FFF4F4" />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.1666 16.0001C21.1666 15.7239 20.9427 15.5001 20.6666 15.5001H11.3333C11.0571 15.5001 10.8333 15.7239 10.8333 16.0001C10.8333 16.2762 11.0571 16.5001 11.3333 16.5001H20.6666C20.9427 16.5001 21.1666 16.2762 21.1666 16.0001Z"
            fill="#FFFBFB"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.1666 12.6667C21.1666 12.3906 20.9427 12.1667 20.6666 12.1667H11.3333C11.0571 12.1667 10.8333 12.3906 10.8333 12.6667C10.8333 12.9429 11.0571 13.1667 11.3333 13.1667H20.6666C20.9427 13.1667 21.1666 12.9429 21.1666 12.6667Z"
            fill="#FFFBFB"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.1666 19.3334C21.1666 19.0573 20.9427 18.8334 20.6666 18.8334H11.3333C11.0571 18.8334 10.8333 19.0573 10.8333 19.3334C10.8333 19.6096 11.0571 19.8334 11.3333 19.8334H20.6666C20.9427 19.8334 21.1666 19.6096 21.1666 19.3334Z"
            fill="#FFFBFB"
        />
    </Svg>
);
export default MenuSvg;
