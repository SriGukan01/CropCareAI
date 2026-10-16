import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DisclaimerBanner from '../components/DisclaimerBanner';
import TopPredictionsMeter from '../components/TopPredictionsMeter';
import '../i18n';

describe('CropCare AI Frontend Component Suite', () => {
  it('verifies agricultural disclaimer notice is suppressed from UI', () => {
    const { container } = render(<DisclaimerBanner />);
    expect(container.firstChild).toBeNull();
  });

  it('renders top predictions meter with percentage bars', () => {
    const mockPredictions = [
      { label: 'Tomato___Early_blight', confidence: 0.884 },
      { label: 'Tomato___Target_Spot', confidence: 0.082 },
      { label: 'Tomato___healthy', confidence: 0.034 }
    ];

    render(
      <TopPredictionsMeter
        topPredictions={mockPredictions}
        confidence={0.884}
        isUncertain={false}
      />
    );

    const percentBadges = screen.getAllByText(/88%/i);
    expect(percentBadges.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Early Blight/i)).toBeInTheDocument();
    expect(screen.queryByText(/Tomato • Early blight/i)).not.toBeInTheDocument();
  });
});
