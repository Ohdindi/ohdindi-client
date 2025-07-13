'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  ArrowCircleRight,
  CheckCircle,
  FileArrowUp,
  NumberCircleOne,
  X,
} from 'phosphor-react';

import Button from '@/components/ui/Button';
import StepLayout from '@/components/ui/StepLayout';

export default function ContinuityUploadStep() {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const MAX_FILES = 10;

  const handleFileUpload = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(
      (file) =>
        file && (file.type.includes('image') || file.type.includes('pdf'))
    );

    const currentFileCount = uploadedFiles.length;
    const availableSlots = MAX_FILES - currentFileCount;

    if (availableSlots <= 0) {
      alert(
        `이미 최대 ${MAX_FILES}개 파일이 업로드되었습니다. 기존 파일을 제거한 후 새 파일을 추가해주세요.`
      );
      return;
    }

    let filesToAdd = validFiles;
    let message = '';

    if (validFiles.length > availableSlots) {
      filesToAdd = validFiles.slice(0, availableSlots);
      message = `최대 ${MAX_FILES}개 파일까지만 지원합니다. 처음 ${availableSlots}개 파일만 업로드하겠습니다.`;
    }

    if (filesToAdd.length > 0) {
      const newUploadedFiles = [...uploadedFiles, ...filesToAdd];
      setUploadedFiles(newUploadedFiles);

      // Store file names in localStorage
      const allFileNames = newUploadedFiles.map((file) => file.name);
      localStorage.setItem('continuityFiles', JSON.stringify(allFileNames));

      // Show message if some files were excluded
      if (message) {
        alert(message);
      }
    }

    // Alert if no valid files were found
    if (validFiles.length === 0 && fileArray.length > 0) {
      alert(
        '지원되는 파일 형식이 아닙니다. 이미지 파일(JPG, PNG, GIF) 또는 PDF 파일만 업로드할 수 있습니다.'
      );
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
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
      handleFileUpload(files);
    }
  };

  const handleNext = () => {
    if (uploadedFiles.length > 0) {
      router.push('/upload/continuity/analysis');
    }
  };

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = uploadedFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setUploadedFiles(updatedFiles);

    // Update localStorage
    const fileNames = updatedFiles.map((file) => file.name);
    localStorage.setItem('continuityFiles', JSON.stringify(fileNames));
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
              : uploadedFiles.length > 0
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
            multiple
            onChange={handleFileSelect}
            title="콘티 파일 업로드"
            aria-label="콘티 파일 업로드"
          />

          {uploadedFiles.length > 0 ? (
            <div className="space-y-3">
              <CheckCircle
                size={32}
                weight="fill"
                className="mx-auto text-green-500 dark:text-green-100"
              />
              <div>
                <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
                  {uploadedFiles.length}개 파일 업로드 완료
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-300">
                  추가로 업로드하거나 아래에서 파일을 관리하세요
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
                  이미지 파일 (JPG, PNG, GIF) 또는 PDF 파일을 지원합니다 (최대{' '}
                  {MAX_FILES}개)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
              업로드된 파일 ({uploadedFiles.length}/{MAX_FILES})
            </h3>
            <div className="max-h-60 space-y-2 overflow-y-auto">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="text-green-500"
                    />
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                        {file.name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="rounded-full p-1 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
                    title="파일 제거"
                  >
                    <X size={16} weight="bold" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Button */}
        {uploadedFiles.length > 0 && (
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
