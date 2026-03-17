import * as React from "react";
import { ownSvgProps } from "../interface";
import { SCREEN_WIDTH } from "../../../constants/responsive";
import Svg, { Mask, Path, Defs, LinearGradient, Stop } from "react-native-svg";

const BottomBackSvg = (props: ownSvgProps) => (
    <Svg
        width={SCREEN_WIDTH}
        height={80}
        viewBox="0 0 360 86"
        fill="none"
        {...props}
    >
        <Mask id="path-1-inside-1_198_2734" fill="white">
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M236 10C228.211 10 222.468 8.12728 215.952 6.00268C207.412 3.21774 197.544 0 180 0C163.134 0 154.403 2.97381 146.464 5.67803C139.845 7.93272 133.775 10 124 10H0V86H360V10H236Z"
            />
        </Mask>
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M236 10C228.211 10 222.468 8.12728 215.952 6.00268C207.412 3.21774 197.544 0 180 0C163.134 0 154.403 2.97381 146.464 5.67803C139.845 7.93272 133.775 10 124 10H0V86H360V10H236Z"
            fill="white"
        />
        <Path
            d="M215.952 6.00268L216.262 5.05195L215.952 6.00268ZM146.464 5.67803L146.142 4.73143L146.464 5.67803ZM0 10V9H-1V10H0ZM0 86H-1V87H0V86ZM360 86V87H361V86H360ZM360 10H361V9H360V10ZM215.642 6.95341C222.155 9.07721 228.035 11 236 11V9C228.387 9 222.78 7.17736 216.262 5.05195L215.642 6.95341ZM180 1C197.39 1 207.142 4.18176 215.642 6.95341L216.262 5.05195C207.681 2.25372 197.697 -1 180 -1V1ZM146.787 6.62463C154.676 3.93744 163.289 1 180 1V-1C162.979 -1 154.131 2.01018 146.142 4.73143L146.787 6.62463ZM124 11C133.948 11 140.147 8.88608 146.787 6.62463L146.142 4.73143C139.542 6.97936 133.603 9 124 9V11ZM0 11H124V9H0V11ZM1 86V10H-1V86H1ZM360 85H0V87H360V85ZM359 10V86H361V10H359ZM236 11H360V9H236V11Z"
            fill="url(#paint0_linear_198_2734)"
            mask="url(#path-1-inside-1_198_2734)"
        />
        <Defs>
            <LinearGradient
                id="paint0_linear_198_2734"
                x1={180}
                y1={0.000002563}
                x2={180}
                y2={11}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#D20A0A" />
                <Stop offset={1} stopColor="#6C0505" stopOpacity={0} />
            </LinearGradient>
        </Defs>
    </Svg>
);
export default BottomBackSvg;
