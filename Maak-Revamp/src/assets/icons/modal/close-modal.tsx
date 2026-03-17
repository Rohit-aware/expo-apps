import * as React from "react";
import Svg, { G, Rect, Path, Defs, SvgProps } from "react-native-svg";
const CloseModalSvg = (props: SvgProps) => (
    <Svg
        width={76}
        height={64}
        viewBox="0 0 76 64"
        fill="none"
        {...props}
    >
        <G filter="url(#filter0_d_593_8572)">
            <Rect
                x={16}
                width={44}
                height={44}
                rx={22}
                fill="white"
            />
            <Path
                d="M34.4646 25.5359L41.5356 18.4648"
                stroke="#333333"
                strokeWidth={1.5}
                strokeLinecap="round"
            />
            <Path
                d="M34.4646 18.4641L41.5356 25.5352"
                stroke="#333333"
                strokeWidth={1.5}
                strokeLinecap="round"
            />
        </G>
        <Defs></Defs>
    </Svg>
);
export default CloseModalSvg;
