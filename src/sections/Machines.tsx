import { useRef, useState } from 'react'
import SectionHead from '../components/SectionHead'
import MachineTour from '../components/MachineTour'
import FanSpin from '../components/FanSpin'
import { useInView } from '../lib/useInView'
import { INSTALL_CMD } from '../data/site'

export default function Machines() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(0)
  const acc = useInView<HTMLDivElement>()

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD)
      setCopied(true)
    } catch {
      setCopied(false)
    }
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section className="band-lt sec" id="machines">
      <div className="wrap">
        <SectionHead
          eyebrow="Machines & network"
          title={
            <>
              Three boxes in a closet,
              <br />
              run like <em>one platform.</em>
            </>
          }
          lede="Add any spare machine you own, such as a cloud server, an old PC or a Raspberry Pi, and DockBit runs them all from one page. Follow one machine through five steps."
        />

        <MachineTour />

        <div className="mt-qa">
          <div className="mt-q">
            <h3>
              What can I add?
              <small>
                Almost any machine you own. There is no minimum spec: DockBit reads its CPU, memory
                and disk and suggests a role.
              </small>
            </h3>
            <div>
              <div className="mt-tiles">
                <div className="mt-t">
                  <i>Runs your apps</i>
                  <b>Linux server, PC or Pi</b>
                  In the cloud or at home.
                </div>
                <div className="mt-t c">
                  <i>Builds apps</i>
                  <b>Mac</b>
                  Builds iOS apps.
                </div>
                <div className="mt-t c">
                  <i>Builds apps</i>
                  <b>Windows PC</b>
                  Builds Windows apps.
                </div>
                <div className="mt-t w">
                  <i>Joins with a code</i>
                  <b>DockBit OS box</b>
                  A spare machine with the DockBit image on it.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-q">
            <h3>
              How do I add one?
              <small>Pick the way that suits the machine. All three end with it on your Machines page.</small>
            </h3>
            <div className="mt-paths">
              <div className="mt-p best">
                <em>Best to start</em>
                <b>Guided wizard</b>
                <ol>
                  <li>Pick the machine from your network.</li>
                  <li>Paste one command, or lend its password once.</li>
                  <li>It appears within a minute.</li>
                </ol>
              </div>
              <div className="mt-p">
                <b>One script</b>
                <ol>
                  <li>Copy the one-time command.</li>
                  <li>Run it on a server you already log in to.</li>
                  <li>It joins in a few minutes.</li>
                </ol>
              </div>
              <div className="mt-p">
                <b>DockBit OS</b>
                <ol>
                  <li>Flash the image onto the machine.</li>
                  <li>Scan the join code on its screen.</li>
                  <li>It joins. No SSH needed.</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="mt-q">
            <h3>
              What if a machine goes offline?
              <small>You are told first. Your apps then move if your rules allow it.</small>
            </h3>
            <div>
              <div className="mt-tl">
                <div>
                  <b>It stops answering</b>DockBit keeps checking each machine.
                </div>
                <div>
                  <b>You are notified</b>The machine is marked offline, after about a minute.
                </div>
                <div>
                  <b>Apps restart elsewhere</b>On a healthy machine in the same group, after your
                  failover delay.
                </div>
                <div>
                  <b>It comes back</b>Apps can move back on their own, if you turn that on.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-q">
            <h3>
              What access does DockBit get?
              <small>Everything DockBit does on a machine goes through one SSH key.</small>
            </h3>
            <div>
              <div className={`mt-acc${acc.inView ? ' in' : ''}`} ref={acc.ref}>
                <div className="mt-bx">DockBit</div>
                <div className="mt-kl">
                  one SSH key, stored encrypted
                  <span className="mt-ik" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="7.5" cy="12" r="4" />
                      <path d="M11.5 12h9.5M18 12v4.5M14.5 12v3" />
                    </svg>
                  </span>
                </div>
                <div className="mt-bx">
                  Your machine
                  <span className="mt-ok" aria-hidden="true">
                    <svg
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 6.5 4.8 9.2 10 3.5" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="mt-fx">
                <div>
                  <b>Root or sudo</b>Needed to join the group, install packages and reboot.
                </div>
                <div>
                  <b>Password used once</b>A password you lend only installs the key. It is not
                  stored.
                </div>
                <div>
                  <b>Removing a machine</b>Delete it in DockBit, then remove the key line from that
                  machine’s authorized_keys.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-start">
          <p>
            Start with one machine, then add the rest.
            <span>Install DockBit on a server, then use Add a machine.</span>
          </p>
          <div className="mt-sh">
            <code>{INSTALL_CMD}</code>
            <button type="button" onClick={copy}>
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <FanSpin />
        </div>
      </div>
    </section>
  )
}
