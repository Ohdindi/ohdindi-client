'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  ArrowCircleRight,
  CheckCircle,
  FileText,
  NumberSquareTwo,
  Spinner,
} from 'phosphor-react';

import Button from '@/components/ui/Button';
import StepLayout from '@/components/ui/StepLayout';

export default function ContinuityAnalysisStep() {
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [, setAnalysisComplete] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  useEffect(() => {
    // Get uploaded file name from localStorage
    const fileName = localStorage.getItem('continuityFile');
    if (fileName) {
      setUploadedFileName(fileName);
    }

    // Simulate analysis process
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    router.push('/upload/continuity/results');
  };

  const handleBack = () => {
    router.push('/upload/continuity');
  };

  return (
    <StepLayout
      currentStep={2}
      totalSteps={3}
      iconComponent={<NumberSquareTwo size={32} weight="fill" />}
      title="콘티 분석 중"
      subtitle="AI가 콘티를 분석하여 최적의 촬영 장소를 찾고 있습니다."
      onBack={handleBack}
    >
      <div className="space-y-8">
        {/* File Info */}
        <div className="rounded-2xl border border-zinc-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <FileText size={24} weight="fill" className="text-blue-500" />
            </div>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-50">
                {uploadedFileName || '콘티 파일'}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-300">
                업로드 완료
              </p>
            </div>
          </div>
        </div>

        {/* Analysis Process */}
        <div className="space-y-6">
          {isAnalyzing ? (
            <>
              {/* Loading State */}
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <Spinner
                  size={32}
                  className="animate-spin text-zinc-400 dark:text-zinc-600"
                />
                <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
                  콘티 분석 중...
                </p>
                <p className="text-sm text-zinc-500">
                  AI가 콘티의 분위기, 콘셉트, 시간대를 분석하고 있습니다
                </p>
              </div>

              {/* Analysis Steps */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 rounded-lg bg-blue-50 p-4">
                  <CheckCircle
                    size={28}
                    weight="fill"
                    className="text-blue-600 dark:text-blue-600"
                  />
                  <span className="font-medium text-blue-800">
                    이미지 인식 및 분석
                  </span>
                </div>

                <div className="flex items-center space-x-3 rounded-lg bg-yellow-50 p-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-white"></div>
                  </div>
                  <span className="font-medium text-yellow-800">
                    분위기 및 콘셉트 분석
                  </span>
                </div>

                <div className="flex items-center space-x-3 rounded-lg bg-zinc-50 p-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-300">
                    <div className="h-3 w-3 rounded-full bg-zinc-400"></div>
                  </div>
                  <span className="font-medium text-zinc-600">
                    최적 촬영 장소 추천
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Analysis Complete */}
              <div className="flex flex-col items-center space-y-4 text-center">
                <CheckCircle
                  size={28}
                  weight="fill"
                  className="text-green-500 dark:text-green-100"
                />
                <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
                  분석 완료!
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  콘티에 맞는 최적의 촬영 장소를 찾았습니다
                </p>
              </div>

              {/* Complete Steps */}
              <div className="space-y-4">
                <div className="dark:bg-green flex items-center space-x-3 rounded-lg bg-green-50 p-4">
                  <CheckCircle
                    size={28}
                    weight="fill"
                    className="text-green-500 dark:text-green-100"
                  />
                  <span className="font-medium text-green-800">
                    이미지 인식 및 분석
                  </span>
                </div>

                <div className="flex items-center space-x-3 rounded-lg bg-green-50 p-4">
                  <CheckCircle
                    size={28}
                    weight="fill"
                    className="text-green-500 dark:text-green-100"
                  />
                  <span className="font-medium text-green-800">
                    분위기 및 콘셉트 분석
                  </span>
                </div>

                <div className="flex items-center space-x-3 rounded-lg bg-green-50 p-4">
                  <CheckCircle
                    size={28}
                    weight="fill"
                    className="text-green-500 dark:text-green-100"
                  />
                  <span className="font-medium text-green-800">
                    최적 촬영 장소 추천
                  </span>
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end pt-6">
                <Button onClick={handleNext}>
                  결과 확인하기
                  <ArrowCircleRight size={18} weight="fill" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </StepLayout>
  );
}
