import * as React from 'react';

export function AnimatedWords({ text }: { text: string }) {
  const words = text.split(' ');
  return <>{words.map((word, index) => <React.Fragment key={index}>{index > 0 ? ' ' : ''}<span style={{ '--word-index': index } as React.CSSProperties}>{word}</span></React.Fragment>)}</>;
}
