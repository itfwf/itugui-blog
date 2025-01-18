'use client';

import { Copy, CopyCheck, CopyCheckIcon, CopySlashIcon } from "lucide-react";
import React from "react";

export default function CodeCopyBtn({ raw, children }: any) {
    const [copyOk, setCopyOk] = React.useState(false);

    const iconColor = copyOk ? '#0af20a' : '#ddd';
    const icon = copyOk ? 'fa-check-square' : 'fa-copy';

    const handleClick = (e: any) => {
        console.log(children)

        navigator.clipboard.writeText(children.props.children[0]);

        setCopyOk(true);
        setTimeout(() => {
            setCopyOk(false);
        }, 500);
    }

    return (
        <div className="code-copy-btn">
            <Copy onClick={handleClick} style={{ color: iconColor }} />
            <i className={`fas ${icon}`} onClick={handleClick} style={{ color: iconColor }} />
        </div>
    )
}