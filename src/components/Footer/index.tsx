import React, { ReactElement } from 'react'

export default function Footer(): ReactElement {
    return (
        <footer className="bg-white" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="px-4 py-6 bg-gray-50 sm:px-6 lg:px-16">
                <div className="flex flex-wrap items-baseline lg:justify-center">
                    <span className="mt-2 text-sm text-gray-500 font-poppins">
                        {' '}
                        Copyright © 2022{' '}
                        <a
                            href="https://amalrichwin.xyz"
                            className="mx-2 text-heading hover:text-gray-500"
                            rel="noopener noreferrer"
                        >
                            @Richwin
                        </a>
                        . Since 2022{' '}
                    </span>
                </div>
            </div>
        </footer>
    )
}
