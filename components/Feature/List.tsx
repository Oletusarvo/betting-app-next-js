import React from 'react';

type ListProps<T> = React.ComponentProps<'div'> & {
  data: T[];
  onEmptyElement?: React.ReactNode;
  ListItemComponent: ({ item }: { item: T }) => React.ReactNode;
};

export function List<T>({ data, ListItemComponent, onEmptyElement }: ListProps<T>) {
  return (
    <>
      {(data.length &&
        data.map((item, index) => (
          <ListItemComponent
            item={item}
            key={`list-item-${index}-${Date.now()}`}
          />
        ))) ||
        onEmptyElement}
    </>
  );
}
