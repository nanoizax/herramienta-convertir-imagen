import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import FileDropZone from "@/components/tools/FileDropZone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  convertImage,
  extensionForFormat,
  loadImageDimensions,
  type ImageFormat,
} from "@/lib/tools/convertImage";

const ConvertirImagenPage = () => {
  const { t } = useTranslation("tools");

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalDims, setOriginalDims] = useState<{ width: number; height: number } | null>(null);
  const [format, setFormat] = useState<ImageFormat>("image/png");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [keepAspect, setKeepAspect] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (selected: File) => {
    setFile(selected);
    setResultUrl(null);
    setError(null);
    const url = URL.createObjectURL(selected);
    setPreviewUrl(url);
    try {
      const dims = await loadImageDimensions(url);
      setOriginalDims(dims);
      setWidth(String(dims.width));
      setHeight(String(dims.height));
    } catch {
      setError(t("ui.error_generic"));
    }
  };

  const onWidthChange = (value: string) => {
    setWidth(value);
    setResultUrl(null);
    if (keepAspect && originalDims && value) {
      const ratio = originalDims.height / originalDims.width;
      setHeight(String(Math.round(Number(value) * ratio)));
    }
  };

  const onHeightChange = (value: string) => {
    setHeight(value);
    setResultUrl(null);
    if (keepAspect && originalDims && value) {
      const ratio = originalDims.width / originalDims.height;
      setWidth(String(Math.round(Number(value) * ratio)));
    }
  };

  const onFormatChange = (value: ImageFormat) => {
    setFormat(value);
    setResultUrl(null);
  };

  const handleConvert = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const blob = await convertImage(file, {
        format,
        width: width ? Number(width) : undefined,
        height: height ? Number(height) : undefined,
      });
      setResultUrl(URL.createObjectURL(blob));
      const base = file.name.replace(/\.[^.]+$/, "");
      setResultName(`${base}.${extensionForFormat(format)}`);
    } catch {
      setError(t("ui.error_generic"));
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreviewUrl(null);
    setOriginalDims(null);
    setResultUrl(null);
    setError(null);
    setWidth("");
    setHeight("");
  };

  return (
    <ToolPageLayout toolId="convertir-imagen">
      <div className="border border-neutral-800 rounded-xl p-6 md:p-8">
        {!file ? (
          <FileDropZone
            accept="image/jpeg,image/png,image/webp"
            label={t("ui.upload_label")}
            hint={t("ui.upload_hint")}
            onFile={handleFile}
            toolId="convertir-imagen"
          />
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt={file.name}
                  className="w-full sm:w-48 rounded-lg border border-neutral-800 object-contain max-h-48"
                />
              )}
              <div className="flex-1 w-full space-y-4">
                <div>
                  <Label className="text-neutral-300 mb-2 block">{t("ui.format_label")}</Label>
                  <select
                    value={format}
                    onChange={(e) => onFormatChange(e.target.value as ImageFormat)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-white"
                  >
                    <option value="image/png">PNG</option>
                    <option value="image/jpeg">JPG</option>
                    <option value="image/webp">WEBP</option>
                  </select>
                </div>

                <div>
                  <Label className="text-neutral-300 mb-2 block">{t("ui.resize_label")}</Label>
                  <div className="flex gap-3 items-center">
                    <Input
                      type="number"
                      min={1}
                      value={width}
                      onChange={(e) => onWidthChange(e.target.value)}
                      placeholder={t("ui.width_label")}
                    />
                    <span className="text-neutral-500">×</span>
                    <Input
                      type="number"
                      min={1}
                      value={height}
                      onChange={(e) => onHeightChange(e.target.value)}
                      placeholder={t("ui.height_label")}
                    />
                  </div>
                  <label className="flex items-center gap-2 mt-3 text-sm text-neutral-400">
                    <input
                      type="checkbox"
                      checked={keepAspect}
                      onChange={(e) => setKeepAspect(e.target.checked)}
                    />
                    {t("ui.keep_aspect")}
                  </label>
                </div>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex flex-wrap gap-3">
              {!resultUrl ? (
                <Button
                  onClick={handleConvert}
                  isLoading={processing}
                  loadingText={t("ui.processing")}
                  className="bg-white text-black hover:bg-white/80 rounded-full px-8"
                >
                  {t("ui.convert_button")}
                </Button>
              ) : (
                <a href={resultUrl} download={resultName}>
                  <Button className="bg-white text-black hover:bg-white/80 rounded-full px-8">
                    <Download className="w-4 h-4" />
                    {t("ui.download_button")}
                  </Button>
                </a>
              )}
              <Button
                variant="outline"
                onClick={reset}
                className="rounded-full px-8 border-neutral-700 text-white bg-transparent hover:bg-white/10"
              >
                {t("ui.reset_button")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ConvertirImagenPage;
