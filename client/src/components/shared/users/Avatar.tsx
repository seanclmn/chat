import { ReactElement } from "react";

interface AvatarProps extends React.AllHTMLAttributes<HTMLImageElement> {
  containerStyle?: string;
}

export const Avatar = ({ src, containerStyle }: AvatarProps): ReactElement => {
  return (
    <img
      src={src}
      className={"rounded-full h-6 m-1 " + containerStyle}
    />);
};
