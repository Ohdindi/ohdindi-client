'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  ArrowCounterClockwise,
  CheckCircle,
  Confetti,
  MapPin,
  MapPinLine,
} from 'phosphor-react';

import Button from '@/components/ui/Button';
import StepLayout from '@/components/ui/StepLayout';

interface LocationRecommendation {
  id: number;
  name: string;
  address: string;
  score: number;
  features: string[];
  image: string;
  description: string;
}

const mockRecommendations: LocationRecommendation[] = [
  {
    id: 1,
    name: '한강공원 뚝섬지구',
    address: '서울시 광진구 자양동',
    score: 95,
    features: ['자연광', '개방감', '도시 스카이라인'],
    image: '/api/placeholder/400/300',
    description:
      '콘티의 자연스러운 분위기와 도시적 감성을 모두 담을 수 있는 최적의 장소입니다.',
  },
  {
    id: 2,
    name: '경의선숲길 연남동',
    address: '서울시 마포구 연남동',
    score: 88,
    features: ['트렌디한 분위기', '카페 거리', '젊은 감성'],
    image: '/api/placeholder/400/300',
    description:
      '콘티의 캐주얼하고 세련된 분위기를 잘 표현할 수 있는 장소입니다.',
  },
  {
    id: 3,
    name: 'DDP 동대문디자인플라자',
    address: '서울시 중구 을지로',
    score: 82,
    features: ['미래적 건축', 'LED 조명', '모던한 분위기'],
    image: '/api/placeholder/400/300',
    description: '콘티의 혁신적이고 현대적인 요소를 강조할 수 있는 장소입니다.',
  },
];

export default function ContinuityResultsStep() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  const handleLocationSelect = (locationId: number) => {
    setSelectedLocation(locationId);
  };

  const handleFinish = () => {
    if (selectedLocation) {
      // Store selected location
      localStorage.setItem('selectedLocation', selectedLocation.toString());

      // Store project completion info
      const selectedLocationData = mockRecommendations.find(
        (loc) => loc.id === selectedLocation
      );
      const projectData = {
        id: Date.now(),
        name: `콘티 분석 프로젝트 ${new Date().toLocaleDateString()}`,
        location: selectedLocationData,
        createdAt: new Date().toISOString(),
        continuityFile: localStorage.getItem('continuityFile'),
      };

      // Get existing projects and add new one
      const existingProjects = JSON.parse(
        localStorage.getItem('userProjects') || '[]'
      );
      existingProjects.push(projectData);
      localStorage.setItem('userProjects', JSON.stringify(existingProjects));

      router.push('/');
    }
  };

  const handleBack = () => {
    router.push('/upload/continuity/analysis');
  };

  const handleStartOver = () => {
    localStorage.removeItem('continuityFile');
    localStorage.removeItem('selectedLocation');
    router.push('/upload/continuity');
  };

  return (
    <StepLayout
      currentStep={3}
      totalSteps={3}
      iconComponent={<MapPin size={32} weight="fill" />}
      title="추천 촬영 장소"
      subtitle="콘티 분석을 바탕으로 최적의 촬영 장소를 추천해드립니다."
      onBack={handleBack}
    >
      <div className="space-y-6">
        {/* Analysis Summary */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-2 font-semibold text-blue-900">분석 요약</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              • <span className="font-medium">주요 분위기:</span> 자연스럽고
              세련된 도시 감성
            </p>
            <p>
              • <span className="font-medium">촬영 시간대:</span> 골든아워 (일몰
              1시간 전)
            </p>
            <p>
              • <span className="font-medium">필요 요소:</span> 개방감, 자연광,
              도시 배경
            </p>
          </div>
        </div>

        {/* Location Recommendations */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            추천 장소
          </h3>

          {mockRecommendations.map((location) => (
            <div
              key={location.id}
              className={`cursor-pointer rounded-lg border p-6 transition-all ${
                selectedLocation === location.id
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-700'
              }`}
              onClick={() => handleLocationSelect(location.id)}
            >
              <div className="flex items-start space-x-4">
                {/* Location Image */}
                <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-200">
                  <MapPinLine
                    size={32}
                    weight="fill"
                    className="text-zinc-50 dark:text-zinc-600"
                  />
                </div>

                {/* Location Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">
                        {location.name}
                      </h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300">
                        {location.address}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-blue-600">
                        매칭도
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        {location.score}%
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-zinc-700 dark:text-zinc-400">
                    {location.description}
                  </p>

                  {/* Features */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {location.features.map((feature, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedLocation === location.id && (
                  <CheckCircle
                    size={28}
                    weight="fill"
                    className="text-blue-600 dark:text-blue-600"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button onClick={handleStartOver}>
            <ArrowCounterClockwise size={18} weight="fill" />
            다시 시작
          </Button>
          <Button onClick={handleFinish} disabled={!selectedLocation}>
            선택 완료
            <Confetti size={18} weight="fill" />
          </Button>
        </div>
      </div>
    </StepLayout>
  );
}
