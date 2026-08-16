import React from 'react';
import Link from 'next/link';
import { ALL_RESOURCES } from '@/constants/nestedResourcesData';
import { notFound } from 'next/navigation';
import Atomic3DAnimation from '@/components/Atomic3DAnimation';
import Circuit3DAnimation from '@/components/Circuit3DAnimation';
import CircuitSimulatorTable from '@/components/CircuitSimulatorTable';
import SuperpositionSimulatorTable from '@/components/SuperpositionSimulatorTable';
import TransformerTestSimulatorTable from '@/components/TransformerTestSimulatorTable';

interface DetailPageProps {
  params: Promise<{
    category: string;
    topic: string;
    resource_id: string;
  }>;
}

export default async function ResourceDetailPage({ params }: DetailPageProps) {
  const resolvedParams = await params;
  const { category, topic, resource_id } = resolvedParams;

  const resource = ALL_RESOURCES.find((r) => r.id === resource_id);

  if (!resource) {
    notFound();
  }

  const isSubatomicPage = resource.id === '66be4a1f89c02d1e34f8a101';
  const isCircuitPage = resource.id === '66be4a1f89c02d1e34f8a102';

  // Experiments
  const isTheveninNortonExp = resource.id === '66be4a1f89c02d1e34f8a502';
  const isSuperpositionExp = resource.id === '66be4a1f89c02d1e34f8a503';
  const isTransformerTestExp = resource.id === '66be4a1f89c02d1e34f8a504';

  // History Topics
  const isChronologyHistory = resource.id === '66be4a1f89c02d1e34f8a301';
  const isWarOfCurrentsHistory = resource.id === '66be4a1f89c02d1e34f8a302';
  const isTransistorHistory = resource.id === '66be4a1f89c02d1e34f8a303';

  return (
    <div className="py-8 px-4 sm:px-8 lg:px-16 w-full font-serif space-y-6">
      {/* Breadcrumb Path */}
      <div className="text-xs font-mono text-stone-500 flex flex-wrap gap-1 items-center">
        <Link href="/" className="hover:underline">domain</Link>
        <span>/</span>
        <Link href="/resources" className="hover:underline">resources</Link>
        <span>/</span>
        <Link href={`/resources/${category}`} className="hover:underline">{category}</Link>
        <span>/</span>
        <Link href={`/resources/${category}/${topic}`} className="hover:underline">{topic}</Link>
        <span>/</span>
        <span className="text-black dark:text-white font-bold">{resource.topicLabel}</span>
      </div>

      <article className="border-b border-stone-300 dark:border-stone-800 pb-8 space-y-6">
        <div className="flex flex-wrap items-baseline justify-between text-xs font-mono text-stone-500 gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
          <span>CATEGORY: {resource.categoryLabel.toUpperCase()} | TOPIC: {resource.topicLabel.toUpperCase()}</span>
          <span>DATE: {resource.date}</span>
        </div>

        <h1 className="text-2xl font-bold text-black dark:text-white leading-tight">
          {resource.title}
        </h1>

        <div className="text-xs font-mono text-stone-600 dark:text-stone-400 flex flex-wrap gap-4">
          <span>Author: {resource.author}</span>
          {resource.difficulty && <span>Level: {resource.difficulty}</span>}
          {resource.fileSize && <span>File Size: {resource.fileSize}</span>}
          <span className="text-blue-900 dark:text-blue-400 font-mono">ObjectID: {resource.id}</span>
        </div>

        {/* ABSTRACT & SCOPE */}
        <div className="p-4 bg-[#F5F5F0] dark:bg-[#181818] border border-stone-300 dark:border-stone-800 text-xs font-mono">
          <p className="font-bold mb-1 uppercase text-black dark:text-white">&gt; ARCHIVAL SUMMARY &amp; HISTORICAL SCOPE:</p>
          <p className="text-stone-800 dark:text-stone-300 leading-relaxed">{resource.description}</p>
        </div>

        {/* THREE.JS ANIMATIONS */}
        {isSubatomicPage && <Atomic3DAnimation />}
        {isCircuitPage && <Circuit3DAnimation />}

        {/* HISTORY CONTENT SECTION 1: CHRONOLOGY OF ELECTRICAL DISCOVERY */}
        {isChronologyHistory && (
          <div className="space-y-6 text-sm text-stone-900 dark:text-stone-100 leading-relaxed">
            <h2 className="font-bold text-lg border-b-2 border-stone-800 dark:border-stone-200 pb-1">
              CHRONOLOGY OF ELECTROMAGNETIC DISCOVERY (1800 - 1873)
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-base text-black dark:text-white">1. Alessandro Volta &amp; The Invention of the Voltaic Pile (1800)</h3>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-300">
                  Prior to 1800, electricity was restricted to transient static charges produced by friction (Leyden jars). Italian physicist <strong>Alessandro Volta</strong> stacked alternating zinc and silver discs separated by brine-soaked cardboard, creating the <em>Voltaic Pile</em>—the first chemical apparatus capable of supplying a continuous, steady direct current (DC) potential. This breakthrough enabled systematic study of continuous current flow.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base text-black dark:text-white">2. Hans Christian Ørsted &amp; Electromagnetism (1820)</h3>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-300">
                  During a lecture demonstration in April 1820, Danish physicist <strong>Hans Christian Ørsted</strong> observed that a magnetic compass needle deflected whenever an electric current was connected or interrupted in a nearby wire. This proved for the first time that electric currents generate surrounding magnetic fields.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base text-black dark:text-white">3. André-Marie Ampère &amp; Circuital Law (1820 - 1826)</h3>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-300">
                  Following Ørsted&apos;s discovery, <strong>André-Marie Ampère</strong> formulated the mathematical principles of electrodynamics. He derived <em>Ampère&apos;s Circuital Law</em> and proved that two parallel current-carrying conductors exert attractive or repulsive magnetic forces upon one another.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base text-black dark:text-white">4. Michael Faraday &amp; Electromagnetic Induction (1831)</h3>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-300">
                  In August 1831, <strong>Michael Faraday</strong> demonstrated that a changing magnetic flux induces an electromotive force (EMF) in a nearby closed conductive loop (EMF = -d&Phi;/dt). Faraday&apos;s induction law formed the foundational principle behind electric generators, transformers, and induction motors.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base text-black dark:text-white">5. James Clerk Maxwell &amp; Electromagnetic Unification (1865 - 1873)</h3>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-300">
                  Scottish mathematical physicist <strong>James Clerk Maxwell</strong> unified electricity, magnetism, and light into four elegant partial differential equations (Maxwell&apos;s Equations). By adding the <em>displacement current term</em>, Maxwell predicted that electromagnetic waves propagate through space at the speed of light.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* HISTORY CONTENT SECTION 2: THE WAR OF CURRENTS */}
        {isWarOfCurrentsHistory && (
          <div className="space-y-6 text-sm text-stone-900 dark:text-stone-100 leading-relaxed">
            <h2 className="font-bold text-lg border-b-2 border-stone-800 dark:border-stone-200 pb-1">
              THE WAR OF CURRENTS: TESLA, WESTINGHOUSE &amp; EDISON (1880s - 1890s)
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-base text-black dark:text-white">1. Thomas Edison &amp; Direct Current (DC) Local Grids</h3>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-300">
                  In 1882, <strong>Thomas Edison</strong> opened the Pearl Street Station in New York City, establishing low-voltage (110V) Direct Current (DC) power distribution. However, DC transmission suffered severe line losses (P = I<sup>2</sup>R). Because low-voltage DC could not be easily stepped up or down, power plants had to be located within 1 mile of consumers, requiring thick copper cables and frequent generation stations.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base text-black dark:text-white">2. Nikola Tesla &amp; Polyphase AC Transformers</h3>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-300">
                  <strong>Nikola Tesla</strong> invented the polyphase Alternating Current (AC) induction motor and AC distribution system. Partnering with <strong>George Westinghouse</strong>, they utilized <em>transformers</em> to step up AC voltages to tens of thousands of volts for long-distance transmission with minimal line loss, stepping it back down safely at customer premises.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base text-black dark:text-white">3. The Niagara Falls Power Project Victory (1896)</h3>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-300">
                  The feud culminated in 1893 when Westinghouse won the contract to power the Chicago World&apos;s Fair using Tesla AC systems, followed by the commissioning of the Niagara Falls Hydroelectric Power Station in 1896. Transmitting 22 miles to Buffalo, NY, AC permanently proved its superiority for national electrical grid distribution.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* HISTORY CONTENT SECTION 3: THE TRANSISTOR REVOLUTION */}
        {isTransistorHistory && (
          <div className="space-y-6 text-sm text-stone-900 dark:text-stone-100 leading-relaxed">
            <h2 className="font-bold text-lg border-b-2 border-stone-800 dark:border-stone-200 pb-1">
              THE TRANSISTOR REVOLUTION &amp; SOLID-STATE MICROELECTRONICS
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-base text-black dark:text-white">1. Thermionic Vacuum Tubes (1904 - 1940s)</h3>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-300">
                  The 20th century electronics era began with John Ambrose Fleming&apos;s diode valve (1904) and Lee de Forest&apos;s Audion triode (1906). Vacuum tubes allowed amplification and switching but were fragile, consumed massive filament power, generated heat, and suffered high failure rates in early computers like ENIAC.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base text-black dark:text-white">2. Bell Labs &amp; The Invention of the Point-Contact Transistor (1947)</h3>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-300">
                  On December 23, 1947, <strong>John Bardeen</strong>, <strong>Walter Brattain</strong>, and <strong>William Shockley</strong> at Bell Telephone Laboratories invented the point-contact germanium transistor. Replacing fragile vacuum filaments with solid-state semiconductor physics, transistors enabled instant-on operation, low power consumption, and microscopic miniaturization.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base text-black dark:text-white">3. Silicon Planar ICs &amp; Moore&apos;s Law (1958 - Present)</h3>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-300">
                  In 1958–1959, Jack Kilby (Texas Instruments) and Robert Noyce (Fairchild Semiconductor) independently invented the Integrated Circuit (IC). Photolithographic fabrication allowed millions of MOSFET transistors to be integrated onto a single silicon chip, giving rise to modern microprocessors and computing.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* EXPERIMENTS OR DEFAULT SECTION */}
        {isTheveninNortonExp && (
          <div className="space-y-6 text-sm text-stone-900 dark:text-stone-100 leading-relaxed">
            <h2 className="text-lg font-bold text-black dark:text-white mb-2">1. EXPERIMENT NAME &amp; OBJECTIVE</h2>
            <p className="text-xs sm:text-sm font-mono text-stone-800 dark:text-stone-300">
              Verification of Thévenin&apos;s and Norton&apos;s Equivalent Network Theorems.
            </p>
            <CircuitSimulatorTable />
          </div>
        )}

        {isSuperpositionExp && (
          <div className="space-y-6 text-sm text-stone-900 dark:text-stone-100 leading-relaxed">
            <h2 className="text-lg font-bold text-black dark:text-white mb-2">1. EXPERIMENT NAME &amp; OBJECTIVE</h2>
            <p className="text-xs sm:text-sm font-mono text-stone-800 dark:text-stone-300">
              Verification of Superposition Theorem in Multi-Source DC Networks.
            </p>
            <SuperpositionSimulatorTable />
          </div>
        )}

        {isTransformerTestExp && (
          <div className="space-y-6 text-sm text-stone-900 dark:text-stone-100 leading-relaxed">
            <h2 className="text-lg font-bold text-black dark:text-white mb-2">1. EXPERIMENT NAME &amp; OBJECTIVE</h2>
            <p className="text-xs sm:text-sm font-mono text-stone-800 dark:text-stone-300">
              Open Circuit (OC) and Short Circuit (SC) Tests on Single-Phase Transformer.
            </p>
            <TransformerTestSimulatorTable />
          </div>
        )}

        <div className="pt-6 font-mono text-xs border-t border-stone-300 dark:border-stone-800">
          <p className="text-stone-500 mb-3">
            This entry is stored in the primary EEvolution 2.0 technical database and dynamically controlled via the administrator panel.
          </p>
          <a
            href="#"
            className="inline-block px-4 py-2 border border-stone-800 dark:border-stone-200 bg-stone-900 text-white dark:bg-stone-100 dark:text-black font-bold uppercase hover:underline"
          >
            [ Download Full Specification ({resource.fileSize || '5.6 MB PDF'}) ]
          </a>
        </div>
      </article>
    </div>
  );
}
