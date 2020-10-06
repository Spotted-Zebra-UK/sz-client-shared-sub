import './Type.scss';
import React, { FC } from 'react';

export interface IType {
  name: string;
  grade: string;
}

const Type: FC<IType> = props => {
  const { name, grade } = props;

  return (
    <div className="Type">
      <img
        src={`${process.env.PUBLIC_URL}/Type/${name}.svg`}
        alt="type.svg"
        className="Type__Image"
      />
      <h5 className="Type__Name">{name}</h5>
      <h5 className="Type__Score">{grade}</h5>
    </div>
  );
};

export default Type;
