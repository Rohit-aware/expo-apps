import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop, SvgProps } from "react-native-svg";

const ProfileCardIcon = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.1837 4.91231L12 4.74982L4.81627 4.91231C3.48511 4.94242 2.35801 5.90304 2.11732 7.2126C1.5356 10.3777 1.5356 13.6223 2.11732 16.7874C2.35801 18.097 3.48511 19.0576 4.81627 19.0877L12 19.2502L19.1837 19.0877C20.5149 19.0576 21.642 18.097 21.8827 16.7874C22.4644 13.6223 22.4644 10.3777 21.8827 7.2126C21.642 5.90303 20.5149 4.94242 19.1837 4.91231ZM4.85019 6.41192L12 6.2502L19.1498 6.41192C19.7701 6.42595 20.2952 6.87355 20.4074 7.48375C20.5607 8.31774 20.6711 9.15758 20.7388 10H3.26121C3.32886 9.15758 3.43933 8.31774 3.59261 7.48375C3.70476 6.87355 4.22993 6.42595 4.85019 6.41192ZM3.18103 12C3.18103 13.5117 3.31822 15.0233 3.59261 16.5163C3.70476 17.1265 4.22993 17.5741 4.85019 17.5881L12 17.7498L19.1498 17.5881C19.7701 17.5741 20.2952 17.1265 20.4074 16.5163C20.6818 15.0233 20.819 13.5117 20.819 12H3.18103Z"
            fill="url(#paint0_linear_593_2376)"
        />
        <Defs>
            <LinearGradient
                id="paint0_linear_593_2376"
                x1={5.73134}
                y1={18.0551}
                x2={11.7618}
                y2={5.46415}
                gradientUnits="userSpaceOnUse"
            >
                <Stop offset={0.47} stopColor="#D20A0A" />
                <Stop offset={0.505} stopColor="#3A4D8F" />
            </LinearGradient>
        </Defs>
    </Svg>
);
export default ProfileCardIcon;
