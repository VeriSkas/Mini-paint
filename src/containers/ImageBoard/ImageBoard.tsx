import { useEffect } from 'react';

import { Image } from '../../components/Image/Image';
import { TextMessage } from '../../components/UI/TextMessage/TextMessage';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ImageInDB } from '../../interfaces/interfaces';
import { ContentText } from '../../constants/text/text';
import { fetchImages, filterImagesByUser } from '../../store/imageSlice';
import classes from './ImageBoard.module.scss';

export const ImageBoard = (props: { user: string }) => {
  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.images.images);

  useEffect((): void => {
    if (props.user) {
      dispatch(filterImagesByUser(props.user));
    } else {
      dispatch(fetchImages());
    }
  }, [props.user]);

  const renderImages = (images: ImageInDB[]) => {
    if (images.length) {
      return images.map((image) => <Image key={image.id} src={image.image} />);
    }

    return <TextMessage text={ContentText.noImages} />;
  };

  return <div className={classes.ImageBoard}>{renderImages(images)}</div>;
};
