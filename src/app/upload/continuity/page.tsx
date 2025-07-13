'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  ArrowCircleRight,
  CheckCircle,
  FileArrowUp,
  NumberCircleOne,
} from 'phosphor-react';

import Button from '@/components/ui/Button';
import StepLayout from '@/components/ui/StepLayout';

export default function ContinuityUploadStep() {
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = (file: File) => {
    if (file && (file.type.includes('image') || file.type.includes('pdf'))) {
      setUploadedFile(file);
      // Store file info in localStorage or context
      localStorage.setItem('continuityFile', file.name);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleNext = () => {
    if (uploadedFile) {
      router.push('/upload/continuity/analysis');
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <StepLayout
      currentStep={1}
      totalSteps={3}
      iconComponent={<NumberCircleOne size={32} weight="fill" />}
      title="콘티 업로드"
      subtitle="분석할 콘티를 업로드해주세요. 이미지 또는 PDF 파일을 지원합니다."
      onBack={handleBack}
    >
      <div className="space-y-6">
        {/* File Upload Area */}
        <div
          className={`relative rounded-2xl border-2 border-dashed p-12 text-center transition-colors ${
            isDragOver
              ? 'border-blue-500 bg-blue-50 dark:border-blue-600 dark:bg-blue-900'
              : uploadedFile
                ? 'border-green-500 bg-green-50 dark:border-green-600 dark:bg-green-900'
                : 'border-zinc-300 dark:border-zinc-600'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            id="file-upload"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            accept="image/*,.pdf"
            onChange={handleFileSelect}
            title="콘티 파일 업로드"
            aria-label="콘티 파일 업로드"
          />

          {uploadedFile ? (
            <div className="flex flex-col items-center justify-center space-y-3">
              <CheckCircle
                size={32}
                weight="fill"
                className="text-green-500 dark:text-green-100"
              />

              <div>
                <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
                  {uploadedFile.name}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-300">
                  업로드 완료
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <FileArrowUp
                size={32}
                weight="fill"
                className="mx-auto flex animate-bounce items-center justify-center text-zinc-800 transition-all duration-300 hover:scale-110 dark:text-zinc-200"
              />

              <div>
                <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
                  파일을 드래그하거나 클릭하여 업로드
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  이미지 파일 (JPG, PNG, GIF) 또는 PDF 파일을 지원합니다
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Next Button */}
        {uploadedFile && (
          <div className="flex justify-end">
            <Button onClick={handleNext}>
              다음 단계로
              <ArrowCircleRight size={18} weight="fill" />
            </Button>
          </div>
        )}
      </div>
    </StepLayout>
  );
}
