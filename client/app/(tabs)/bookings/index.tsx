import React from 'react'
import { Text, View } from 'react-native'
import Svg, { Polygon, Rect, Defs, ClipPath } from "react-native-svg";


export default function Booking() {
  const StarRate = ({ size = 100, color = "gold", rate = 50 }) => {
    const points = [];
    const outerRadius = size / 2;
    const innerRadius = outerRadius * 0.5;
    const cx = outerRadius;
    const cy = outerRadius;

    for (let i = 0; i < 5; i++) {
      const outerX = cx + outerRadius * Math.cos((18 + i * 72) * (Math.PI / 180));
      const outerY = cy - outerRadius * Math.sin((18 + i * 72) * (Math.PI / 180));
      points.push(`${outerX},${outerY}`);

      const innerX = cx + innerRadius * Math.cos((54 + i * 72) * (Math.PI / 180));
      const innerY = cy - innerRadius * Math.sin((54 + i * 72) * (Math.PI / 180));
      points.push(`${innerX},${innerY}`);
    }

    const filledWidth = (size * rate) / 100;
    return (
      <View>
        <Svg width={size} height={size}>
          {/* Ngôi sao nền */}
          <Polygon points={points.join(" ")} fill="#ddd" />
          <Defs>
            <ClipPath id="clip">
              <Rect x="0" y="0" width={filledWidth} height={size} />
            </ClipPath>
          </Defs>
          {/* Ngôi sao màu theo rate */}
          <Polygon points={points.join(" ")} fill={color} clipPath="url(#clip)" />
        </Svg>
      </View>
    )
  }
}
