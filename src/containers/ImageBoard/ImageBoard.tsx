import { useEffect, useState } from 'react';

import {
  getImages,
  unsubscribeImages,
} from '../../api/apiHandlers/dataBaseHandler';
import { Image } from '../../components/Image/Image';
import { TextMessage } from '../../components/UI/TextMessage/TextMessage';
import { ImageInDB } from '../../shared/interfaces';
import { ContentText } from '../../shared/text/text';
import classes from './ImageBoard.module.scss';

export const ImageBoard = (props: any) => {
  const [images, setImages] = useState<ImageInDB[]>([]);

  useEffect((): void | any => {
    getImages().then((res: ImageInDB[]) => {
      if (res.length) {
        if (props.user) {
          const userImages: ImageInDB[] = res.filter(
            (image) => image.userUID === props.user
          );

          setImages(() => [...userImages]);
        } else {
          setImages(() => [...res]);
        }
      }
    });

    return () => unsubscribeImages();
  }, [props.user]);

  const renderImages = (images: ImageInDB[]) => {
    if (images.length) {
      return images.map((image) => <Image key={image.id} src={image.image} />);
    }

    return <TextMessage text={ContentText.noImages} />;
  };

  return <div className={classes.ImageBoard}>{renderImages(images)}</div>;
};
