import React, { ReactNode } from 'react';

const Link = ({ href, children }: { href: string; children: ReactNode }) => {
  return React.createElement('a', { href }, children);
};

export default Link;
