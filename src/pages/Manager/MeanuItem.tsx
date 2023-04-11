import React from 'react';
import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem';

interface MenuItemProps extends Omit<MuiMenuItemProps, 'value'> {
  value: any;
}

export default function MenuItem(props: MenuItemProps) {
  const { value, children, ...rest } = props;
  return <MuiMenuItem {...rest}>{children}</MuiMenuItem>;
}
