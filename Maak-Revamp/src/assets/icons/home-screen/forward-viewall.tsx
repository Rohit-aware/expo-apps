import * as React from "react";
import Svg, { Rect, Path, SvgProps } from "react-native-svg";
const ForwardArrow = (props: SvgProps) => (
    <Svg
        width={52}
        height={52}
        viewBox="0 0 52 52"
        fill="none"
        {...props}
    >
        <Rect width={52} height={52} rx={16} fill="#D20A0A" fillOpacity={0.02} />
        <Path
            d="M27.7145 21.9521C27.3728 21.6104 27.3728 21.0564 27.7145 20.7147C28.0562 20.3729 28.6103 20.3729 28.952 20.7147L33.6186 25.3813C33.9603 25.723 33.9603 26.2771 33.6186 26.6188L28.952 31.2854C28.6103 31.6271 28.0562 31.6271 27.7145 31.2854C27.3728 30.9437 27.3728 30.3897 27.7145 30.048L30.8875 26.875H19.5833C19.1 26.875 18.7083 26.4833 18.7083 26C18.7083 25.5168 19.1 25.125 19.5833 25.125H30.8875L27.7145 21.9521Z"
            fill="#3A4D8F"
        />
    </Svg>
);
export default ForwardArrow;
