import { render, screen } from '@testing-library/react';
import RecipeCard from '../components/RecipeCard/RecipeCard';

describe('recipe card app', () => {
  it('should render all elements correctly', () => {
    render(<RecipeCard
      image="image"
      title="test"
      categoryOrAlcoholic="test"
      ingredients={ [] }
      measures={ [] }
      instructions="test"
      video="test"
    />);

    expect(screen.getAllByText('test')[0]).toBeInTheDocument();
    expect(screen.getAllByText('test')).toHaveLength(3);
  });
  it('should not render video with no pass', () => {
    render(<RecipeCard
      image="image"
      title="test"
      categoryOrAlcoholic="test"
      ingredients={ [] }
      measures={ [] }
      instructions="test"
    />);

    expect(screen.getAllByText('test')[0]).toBeInTheDocument();
    expect(screen.getAllByText('test')).toHaveLength(3);
  });
  it('should render all ingredients correctly', () => {
    render(<RecipeCard
      image="image"
      title="test"
      categoryOrAlcoholic="test"
      ingredients={ ['ingredient1', 'ingredient2', 'ingredient3', 'ingredient4'] }
      measures={ ['measure1', 'measure2', 'measure3'] }
      instructions="test"
      video="test"
    />);

    expect(screen.getAllByText('test')[0]).toBeInTheDocument();
    expect(screen.getAllByText('test')).toHaveLength(3);
  });
});
