import { Fragment } from 'react';
import { ContentContainer } from '../layout/ContentContainer.styles';
import {
  BreadcrumbCurrent,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbWrapper,
} from './Breadcrumb.style';

export default function Breadcrumb({ items }) {
  return (
    <>
      <BreadcrumbWrapper>
        <ContentContainer>
          <BreadcrumbList>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <Fragment key={item.label}>
                  {index > 0 && <BreadcrumbSeparator>&gt;</BreadcrumbSeparator>}
                  {item.to && !isLast ? (
                    <BreadcrumbLink to={item.to}>{item.label}</BreadcrumbLink>
                  ) : (
                    <BreadcrumbCurrent>{item.label}</BreadcrumbCurrent>
                  )}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </ContentContainer>
      </BreadcrumbWrapper>
    </>
  );
}
