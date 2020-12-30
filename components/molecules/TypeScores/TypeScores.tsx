import './TypeScores.scss';
import React, { FC } from 'react';
import Type, { IType } from '../../atoms/Type/Type';

interface ITypeScores {
  typeScores: IType[];
}

const TypeScores: FC<ITypeScores> = props => {
  const { typeScores } = props;

  return (
    <div className="TypeScores">
      {typeScores.map(type => {
        return <Type key={type.name} name={type.name} grade={type.grade} />;
      })}
    </div>
  );
};

export default TypeScores;
