import styles from 'styles/components/Features.module.scss';
import { FeatureItem } from './FeatureItem';

interface FeaturesProps {
	input: {
		featureItems: [title: string, image: any, alternativeText: string];
		_key: string;
	};
}

export const Features = ({ input }: FeaturesProps) => {
	const { featureItems, _key } = input;

	const mapFeatures = featureItems.map((item) => {
		return (
			<FeatureItem
				image={item.image}
				title={item.title}
				description={item.description}
				key={item.title}
			/>
		);
	});

	return <section className={styles.wrapper}>{mapFeatures}</section>;
};
