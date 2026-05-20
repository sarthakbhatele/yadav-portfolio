'use client'
import { useState } from 'react'
import Image from 'next/image'
import { set, unset } from 'sanity'
// import type { PatchEvent } from 'sanity'

// ── Cloudinary widget type ───────────────────────────────────────────────────
interface CloudinaryWidget {
    open: () => void
}

interface CloudinaryWidgetResult {
    event: string
    info: {
        public_id: string
        secure_url: string
        resource_type: string
        format: string
        width: number
        height: number
        duration: number | null
    }
}

interface CloudinaryInstance {
    createUploadWidget: (
        options: Record<string, unknown>,
        callback: (error: Error | null, result: CloudinaryWidgetResult) => void
    ) => CloudinaryWidget
}

declare global {
    interface Window {
        cloudinary: CloudinaryInstance
    }
}

// ── Component types ──────────────────────────────────────────────────────────
interface CloudinaryAssetValue {
    _type: 'cloudinaryAsset'
    public_id: string
    secure_url: string
    resource_type: 'video' | 'image' | 'raw'
    format: string
    width: number
    height: number
    duration: number | null
}

interface CloudinaryUploadProps {
    onChange: (patch: ReturnType<typeof set> | ReturnType<typeof unset>) => void
    value?: CloudinaryAssetValue
}

// ── Component ────────────────────────────────────────────────────────────────
export function CloudinaryUpload({ onChange, value }: CloudinaryUploadProps) {
    const [preview, setPreview] = useState<string | null>(value?.secure_url || null)

    const openWidget = () => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'dio3i3vwx',
                uploadPreset: 'portfolio',
                sources: ['local', 'url', 'camera'],
                multiple: false,
            },
            (error, result) => {
                if (!error && result.event === 'success') {
                    const info = result.info
                    onChange(
                        set({
                            _type: 'cloudinaryAsset',
                            public_id: info.public_id,
                            secure_url: info.secure_url,
                            resource_type: info.resource_type,
                            format: info.format,
                            width: info.width,
                            height: info.height,
                            duration: info.duration || null,
                        })
                    )
                    setPreview(info.secure_url)
                }
            }
        )
        widget.open()
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <script src="https://upload-widget.cloudinary.com/global/all.js" async />

            <button
                type="button"
                onClick={openWidget}
                style={{
                    padding: '10px 20px',
                    background: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    width: 'fit-content',
                }}
            >
                {value ? 'Replace File' : 'Upload from Device'}
            </button>

            {preview && value?.resource_type === 'video' && (
                <video src={preview} controls width={300} style={{ borderRadius: '8px' }} />
            )}

            {preview && value?.resource_type === 'image' && (
                <Image
                    src={preview}
                    alt="preview"
                    width={300}
                    height={200}
                    style={{ borderRadius: '8px', objectFit: 'cover' }}
                />
            )}

            {value && (
                <button
                    type="button"
                    onClick={() => { onChange(unset()); setPreview(null) }}
                    style={{
                        padding: '6px 14px',
                        background: '#ff4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        width: 'fit-content',
                    }}
                >
                    Remove
                </button>
            )}
        </div>
    )
}