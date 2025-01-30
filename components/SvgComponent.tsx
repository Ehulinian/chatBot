import React from "react";
import { Svg } from "react-native-svg";
import { styled } from "nativewind";

interface SvgComponentProps {
  width?: number;
  height?: number;
  className?: string;
  children?: React.ReactNode;
}

const StyledSvg = styled(Svg);

const SvgComponent: React.FC<SvgComponentProps> = ({
  width,
  height,
  className,
  children,
  ...props
}) => {
  return (
    <StyledSvg width={width} height={height} className={className} {...props}>
      {children}
    </StyledSvg>
  );
};

export default SvgComponent;
